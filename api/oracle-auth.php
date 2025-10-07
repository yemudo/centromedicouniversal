<?php
// CENTRO MÉDICO UNIVERSAL - ORACLE AUTHENTICATION API
// Secure Login System with User Management
// Super Admin: mcastillo

require_once 'oracle-config.php';

session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // LOGIN - SECURE AUTHENTICATION
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['username']) || !isset($data['password'])) {
        sendError('Username and password are required');
    }
    
    $username = trim($data['username']);
    $password = $data['password'];
    
    // SUPER ADMIN AUTHENTICATION (Initial Setup)
    // After first login, this will be stored in database with hashed password
    if ($username === 'mcastillo' && $password === 'Nivin@CMU2025!') {
        // Super Admin Access
        $_SESSION['user_id'] = 1;
        $_SESSION['username'] = 'mcastillo';
        $_SESSION['full_name'] = 'Manuel Castillo';
        $_SESSION['role'] = 'super_admin';
        $_SESSION['email'] = 'nuelcastillo@centromedicouniversal.com';
        $_SESSION['data_source'] = 'ORACLE_MYSQL';
        $_SESSION['permissions'] = ['*']; // All permissions
        
        // Log successful login
        error_log("Super Admin login: mcastillo at " . date('Y-m-d H:i:s'));
        
        sendSuccess([
            'user_id' => 1,
            'username' => 'mcastillo',
            'full_name' => 'Manuel Castillo',
            'role' => 'super_admin',
            'email' => 'nuelcastillo@centromedicouniversal.com',
            'permissions' => ['*']
        ], 'Welcome back, Manuel!');
    }
    
    // Check database for other users
    $conn = getOracleDBConnection();
    
    $stmt = $conn->prepare("SELECT id, username, password, full_name, role, email, is_active FROM users WHERE username = ? AND is_active = 1");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Invalid credentials - User not found or inactive', 401);
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password (hashed in database)
    if (!password_verify($password, $user['password'])) {
        sendError('Invalid credentials - Incorrect password', 401);
    }
    
    // Create session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['data_source'] = 'ORACLE_MYSQL';
    
    // Get user permissions
    $permStmt = $conn->prepare("SELECT permission FROM user_permissions WHERE user_id = ?");
    $permStmt->bind_param('i', $user['id']);
    $permStmt->execute();
    $permResult = $permStmt->get_result();
    
    $permissions = [];
    while ($perm = $permResult->fetch_assoc()) {
        $permissions[] = $perm['permission'];
    }
    $_SESSION['permissions'] = $permissions;
    
    unset($user['password']);
    $user['permissions'] = $permissions;
    
    sendSuccess($user, 'Login successful');
    
} elseif ($method === 'GET') {
    // CHECK AUTH STATUS
    if (!isset($_SESSION['user_id'])) {
        sendError('Not authenticated', 401);
    }
    
    sendSuccess([
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'full_name' => $_SESSION['full_name'],
        'role' => $_SESSION['role'],
        'email' => $_SESSION['email'],
        'permissions' => $_SESSION['permissions'] ?? [],
        'data_source' => 'ORACLE_MYSQL'
    ]);
    
} elseif ($method === 'DELETE') {
    // LOGOUT
    session_destroy();
    sendSuccess([], 'Logged out successfully');
}
?>