<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Direct connection to Oracle MySQL database
try {
    $conn = new mysqli('localhost', 'root', '', 'centro_medico_universal');
    
    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }
    
    $conn->set_charset('utf8mb4');
    
    // Get real counts from Oracle database
    $doctors_result = $conn->query("SELECT COUNT(*) as count FROM doctors");
    $doctors = $doctors_result->fetch_assoc()['count'];
    
    $users_result = $conn->query("SELECT COUNT(*) as count FROM users");
    $users = $users_result->fetch_assoc()['count'];
    
    $appointments_today_result = $conn->query("SELECT COUNT(*) as count FROM appointments WHERE DATE(appointment_date) = CURDATE()");
    $appointments_today = $appointments_today_result->fetch_assoc()['count'];
    
    $appointments_pending_result = $conn->query("SELECT COUNT(*) as count FROM appointments WHERE status IN ('pending', 'scheduled')");
    $appointments_pending = $appointments_pending_result->fetch_assoc()['count'];
    
    // Return success with real Oracle data
    echo json_encode([
        'success' => true,
        'message' => 'Connected to Oracle MySQL Database',
        'data' => [
            'doctors' => (int)$doctors,
            'users' => (int)$users,
            'appointments' => [
                'today' => (int)$appointments_today,
                'pending' => (int)$appointments_pending
            ]
        ],
        'timestamp' => date('Y-m-d H:i:s'),
        'database' => 'centro_medico_universal'
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_PRETTY_PRINT);
}
?>
