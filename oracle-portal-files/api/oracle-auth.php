<?php
/**
 * ORACLE AUTHENTICATION API
 * Centro Médico Universal - Employee Portal
 * 
 * Handles user authentication against Oracle MySQL database
 * Validates credentials from users table
 */

require_once 'oracle-config.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed. Use POST.', 405);
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    sendError('Invalid JSON data');
}

// Validate required fields
$username = isset($data['username']) ? sanitizeInput($data['username']) : '';
$password = isset($data['password']) ? $data['password'] : '';

if (empty($username) || empty($password)) {
    sendError('Username and password are required');
}

try {
    // Connect to Oracle database
    $conn = getOracleDBConnection();
    
    // Prepare statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT id, username, password, full_name, role FROM users WHERE username = ? LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Invalid credentials');
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password (plain text comparison for now - should use password_hash in production)
    if ($password !== $user['password']) {
        sendError('Invalid credentials');
    }
    
    // Authentication successful
    $userData = [
        'id' => $user['id'],
        'username' => $user['username'],
        'full_name' => $user['full_name'],
        'role' => $user['role']
    ];
    
    // Log successful login
    logActivity($conn, $user['id'], 'login', 'User logged in successfully');
    
    $stmt->close();
    $conn->close();
    
    sendSuccess($userData, 'Login successful');
    
} catch (Exception $e) {
    error_log("ORACLE Auth Error: " . $e->getMessage());
    sendError('Authentication error occurred', 500);
}
?>