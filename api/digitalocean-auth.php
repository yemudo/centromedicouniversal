<?php
// CENTRO MÉDICO UNIVERSAL - DIGITALOCEAN AUTHENTICATION API
// Secure Employee Login System - HIPAA Compliant
// Database: centro_medico_employees

require_once 'oracle-config.php'; // Will rename to digitalocean-config.php

session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // LOGIN - SECURE AUTHENTICATION
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['username']) || !isset($data['password'])) {
        sendError('Usuario y contraseña son requeridos', 400);
    }
    
    $username = trim($data['username']);
    $password = $data['password'];
    
    // Connect to DigitalOcean Database
    $conn = getDigitalOceanDBConnection();
    
    // Query employees table (not users table)
    $stmt = $conn->prepare("
        SELECT id, username, password_hash, full_name, role, email, 
               account_locked, failed_login_attempts, requires_password_change
        FROM employees 
        WHERE username = ?
    ");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        // Log failed login attempt
        error_log("Failed login attempt for username: $username at " . date('Y-m-d H:i:s'));
        sendError('Credenciales inválidas - Usuario no encontrado', 401);
    }
    
    $employee = $result->fetch_assoc();
    
    // Check if account is locked
    if ($employee['account_locked']) {
        error_log("Login attempt for locked account: $username");
        sendError('Cuenta bloqueada - Contacte al administrador', 403);
    }
    
    // Verify password using bcrypt
    if (!password_verify($password, $employee['password_hash'])) {
        // Increment failed login attempts
        $failedAttempts = $employee['failed_login_attempts'] + 1;
        $lockAccount = ($failedAttempts >= 5) ? 1 : 0;
        
        $updateStmt = $conn->prepare("
            UPDATE employees 
            SET failed_login_attempts = ?, 
                account_locked = ?
            WHERE id = ?
        ");
        $updateStmt->bind_param('iii', $failedAttempts, $lockAccount, $employee['id']);
        $updateStmt->execute();
        
        // Log failed login
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
        $logStmt = $conn->prepare("
            INSERT INTO login_audit (employee_id, username, ip_address, user_agent, login_success, failure_reason)
            VALUES (?, ?, ?, ?, 0, 'Invalid password')
        ");
        $logStmt->bind_param('isss', $employee['id'], $username, $ip, $userAgent);
        $logStmt->execute();
        
        sendError('Credenciales inválidas - Contraseña incorrecta', 401);
    }
    
    // SUCCESS - Password is correct
    // Reset failed login attempts
    $resetStmt = $conn->prepare("
        UPDATE employees 
        SET failed_login_attempts = 0, 
            last_login = CURRENT_TIMESTAMP
        WHERE id = ?
    ");
    $resetStmt->bind_param('i', $employee['id']);
    $resetStmt->execute();
    
    // Log successful login
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    $logStmt = $conn->prepare("
        INSERT INTO login_audit (employee_id, username, ip_address, user_agent, login_success)
        VALUES (?, ?, ?, ?, 1)
    ");
    $logStmt->bind_param('isss', $employee['id'], $username, $ip, $userAgent);
    $logStmt->execute();
    
    // Create session
    $_SESSION['user_id'] = $employee['id'];
    $_SESSION['username'] = $employee['username'];
    $_SESSION['full_name'] = $employee['full_name'];
    $_SESSION['role'] = $employee['role'];
    $_SESSION['email'] = $employee['email'];
    $_SESSION['data_source'] = 'DIGITALOCEAN_MYSQL';
    $_SESSION['requires_password_change'] = $employee['requires_password_change'];
    
    unset($employee['password_hash']);
    $employee['data_source'] = 'DIGITALOCEAN_MYSQL';
    
    sendSuccess($employee, '¡Bienvenido, ' . $employee['full_name'] . '!');
    
} elseif ($method === 'GET') {
    // CHECK AUTH STATUS
    if (!isset($_SESSION['user_id'])) {
        sendError('No autenticado', 401);
    }
    
    sendSuccess([
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'full_name' => $_SESSION['full_name'],
        'role' => $_SESSION['role'],
        'email' => $_SESSION['email'],
        'data_source' => 'DIGITALOCEAN_MYSQL',
        'requires_password_change' => $_SESSION['requires_password_change'] ?? false
    ]);
    
} elseif ($method === 'DELETE') {
    // LOGOUT
    session_destroy();
    sendSuccess([], 'Sesión cerrada correctamente');
}
?>
