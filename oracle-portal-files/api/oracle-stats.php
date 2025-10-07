<?php
/**
 * ORACLE STATISTICS API
 * Centro Médico Universal - Employee Portal
 * 
 * Retrieves real-time statistics from Oracle MySQL database
 * Used for dashboard display
 */

require_once 'oracle-config.php';

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed. Use GET.', 405);
}

try {
    // Connect to Oracle database
    $conn = getOracleDBConnection();
    
    // Get total active doctors
    $result = $conn->query("SELECT COUNT(*) as count FROM doctors");
    $doctorsCount = $result->fetch_assoc()['count'];
    
    // Get total users
    $result = $conn->query("SELECT COUNT(*) as count FROM users");
    $usersCount = $result->fetch_assoc()['count'];
    
    // Get appointments today
    $result = $conn->query("SELECT COUNT(*) as count FROM appointments WHERE DATE(appointment_date) = CURDATE()");
    $todayAppointments = $result->fetch_assoc()['count'];
    
    // Get pending appointments
    $result = $conn->query("SELECT COUNT(*) as count FROM appointments WHERE status = 'pending' OR status = 'scheduled'");
    $pendingAppointments = $result->fetch_assoc()['count'];
    
    // Get total appointments
    $result = $conn->query("SELECT COUNT(*) as count FROM appointments");
    $totalAppointments = $result->fetch_assoc()['count'];
    
    // Get doctors by specialty
    $specialtyQuery = $conn->query("
        SELECT specialty, COUNT(*) as count 
        FROM doctors 
        WHERE specialty IS NOT NULL AND specialty != '' 
        GROUP BY specialty 
        ORDER BY count DESC 
        LIMIT 5
    ");
    $specialties = [];
    while ($row = $specialtyQuery->fetch_assoc()) {
        $specialties[] = $row;
    }
    
    // Get users by role
    $roleQuery = $conn->query("
        SELECT role, COUNT(*) as count 
        FROM users 
        GROUP BY role 
        ORDER BY count DESC
    ");
    $roles = [];
    while ($row = $roleQuery->fetch_assoc()) {
        $roles[] = $row;
    }
    
    $conn->close();
    
    // Return statistics
    sendSuccess([
        'doctors' => [
            'total' => (int)$doctorsCount,
            'by_specialty' => $specialties
        ],
        'users' => [
            'total' => (int)$usersCount,
            'by_role' => $roles
        ],
        'appointments' => [
            'today' => (int)$todayAppointments,
            'pending' => (int)$pendingAppointments,
            'total' => (int)$totalAppointments
        ],
        'updated_at' => date('Y-m-d H:i:s')
    ], 'Statistics retrieved successfully');
    
} catch (Exception $e) {
    error_log("ORACLE Stats Error: " . $e->getMessage());
    sendError('Error retrieving statistics: ' . $e->getMessage(), 500);
}
?>