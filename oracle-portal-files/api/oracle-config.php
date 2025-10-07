<?php
/**
 * ORACLE DATABASE CONFIGURATION
 * Centro Médico Universal - Employee Portal
 * 
 * Connects to MySQL database on host machine
 * Database: centro_medico_universal
 * User: root (no password)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ORACLE MySQL Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'centro_medico_universal');
define('DB_CHARSET', 'utf8mb4');

/**
 * Get Oracle Database Connection
 * @return mysqli Database connection object
 * @throws Exception if connection fails
 */
function getOracleDBConnection() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conn->connect_error) {
            error_log("ORACLE DB Connection failed: " . $conn->connect_error);
            throw new Exception('Database connection failed: ' . $conn->connect_error);
        }
        
        if (!$conn->set_charset(DB_CHARSET)) {
            error_log("ORACLE DB Charset error: " . $conn->error);
        }
        
        return $conn;
        
    } catch (Exception $e) {
        error_log("ORACLE Exception: " . $e->getMessage());
        sendError('ORACLE Database connection error: ' . $e->getMessage(), 500);
    }
}

/**
 * Send JSON response
 */
function sendJSON($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}

/**
 * Send error response
 */
function sendError($message, $status = 400) {
    sendJSON([
        'success' => false,
        'error' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ], $status);
}

/**
 * Send success response
 */
function sendSuccess($data = [], $message = 'Success') {
    sendJSON([
        'success' => true,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Log activity to database
 */
function logActivity($conn, $user_id, $action, $details = '') {
    $stmt = $conn->prepare("INSERT INTO activity_log (user_id, action, details, created_at) VALUES (?, ?, ?, NOW())");
    if ($stmt) {
        $stmt->bind_param("iss", $user_id, $action, $details);
        $stmt->execute();
        $stmt->close();
    }
}
?>