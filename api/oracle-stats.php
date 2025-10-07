<?php
// CENTRO MÉDICO UNIVERSAL - ORACLE STATISTICS API
// Real-time Statistics from ORACLE MySQL Database
// All data pulled directly from ORACLE tables

require_once 'oracle-config.php';

session_start();

// Verify ORACLE authentication
if (!isset($_SESSION['user_id'])) {
    sendError('Not authenticated with ORACLE', 401);
}

$conn = getOracleDBConnection();

// Get real-time statistics from ORACLE database
$stats = [];
$stats['data_source'] = 'ORACLE_MYSQL_DATABASE';

// 1. Total users in ORACLE
$result = $conn->query("SELECT COUNT(*) as total FROM users");
$stats['total_users_oracle'] = $result->fetch_assoc()['total'];

// 2. Total doctors in ORACLE
$result = $conn->query("SELECT COUNT(*) as total FROM users WHERE role = 'doctor'");
$stats['total_doctors_oracle'] = $result->fetch_assoc()['total'];

// 3. Appointments today from ORACLE
$today = date('Y-m-d');
$result = $conn->query("SELECT COUNT(*) as total FROM appointments WHERE appointment_date = '$today'");
$stats['appointments_today_oracle'] = $result->fetch_assoc()['total'];

// 4. Pending appointments in ORACLE
$result = $conn->query("SELECT COUNT(*) as total FROM appointments WHERE status IN ('scheduled', 'pending', 'confirmed') AND appointment_date >= '$today'");
$stats['pending_appointments_oracle'] = $result->fetch_assoc()['total'];

// 5. Active schedules in ORACLE
$result = $conn->query("SELECT COUNT(*) as total FROM schedules WHERE is_available = 1");
$stats['total_schedules_oracle'] = $result->fetch_assoc()['total'];

// 6. Staff breakdown from ORACLE
$result = $conn->query("SELECT role, COUNT(*) as count FROM users GROUP BY role");
$roleBreakdown = [];
while ($row = $result->fetch_assoc()) {
    $roleBreakdown[$row['role']] = $row['count'];
}
$stats['role_breakdown_oracle'] = $roleBreakdown;

// 7. Recent activity from ORACLE
$result = $conn->query("
    SELECT a.*, u.full_name as doctor_name 
    FROM appointments a 
    LEFT JOIN users u ON a.doctor_id = u.id 
    ORDER BY a.appointment_date DESC, a.appointment_time DESC 
    LIMIT 10
");
$recentAppointments = [];
while ($row = $result->fetch_assoc()) {
    $recentAppointments[] = $row;
}
$stats['recent_appointments_oracle'] = $recentAppointments;

// 8. ORACLE system info
$stats['oracle_info'] = [
    'database' => DB_NAME,
    'host' => DB_HOST,
    'connection_status' => 'ACTIVE',
    'timestamp' => date('Y-m-d H:i:s')
];

$conn->close();

sendSuccess($stats, 'Statistics retrieved from ORACLE database');
?>
