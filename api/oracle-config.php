<?php
// CENTRO MÉDICO UNIVERSAL - DIGITALOCEAN DATABASE API
// Sistema Conectado a Base de Datos DigitalOcean MySQL
// All data comes from DIGITALOCEAN - No external services

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// DIGITALOCEAN MYSQL DATABASE CONNECTION
// MySQL running in Docker container - connect via TCP
define('DB_HOST', '127.0.0.1');  // Use 127.0.0.1 instead of localhost for TCP
define('DB_USER', 'root');
define('DB_PASS', 'medico2025DB');
define('DB_NAME', 'centro_medico_employees');

// Connect to DigitalOcean MySQL Database
function getDigitalOceanDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die(json_encode([
            'success' => false,
            'error' => 'DigitalOcean Database connection failed: ' . $conn->connect_error
        ]));
    }
    
    $conn->set_charset('utf8mb4');
    return $conn;
}

function sendJSON($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function sendError($message, $status = 400) {
    sendJSON(['success' => false, 'error' => $message], $status);
}

function sendSuccess($data = [], $message = 'Success') {
    sendJSON(['success' => true, 'message' => $message, 'data' => $data]);
}
?>
