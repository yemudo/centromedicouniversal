<?php
// CENTRO MÉDICO UNIVERSAL - APPOINTMENTS API
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'db-config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';
$date = $_GET['date'] ?? date('Y-m-d');

switch ($action) {
    case 'get_providers':
        getProviders();
        break;
    case 'get_appointments':
        getAppointments($date);
        break;
    case 'get_calendar_data':
        getCalendarData($date);
        break;
    default:
        sendError('Invalid action');
}

function getProviders() {
    $conn = getDBConnection();
    
    $query = "SELECT id, nombre_completo as nombre, especialidad 
              FROM doctores 
              ORDER BY especialidad, nombre_completo
              LIMIT 50";
    
    $result = $conn->query($query);
    
    if (!$result) {
        sendError('Error fetching providers: ' . $conn->error);
    }
    
    $providers = [];
    while ($row = $result->fetch_assoc()) {
        $providers[] = $row;
    }
    
    sendSuccess($providers);
}

function getAppointments($date) {
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("
        SELECT 
            a.id,
            a.appointment_id,
            a.doctor_id,
            a.patient_id,
            a.appointment_date,
            a.appointment_time,
            a.duration_minutes,
            a.appointment_type,
            a.status,
            a.chief_complaint,
            CONCAT(p.first_name, ' ', p.last_name) as patient_name,
            d.nombre_completo as doctor_name
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctores d ON a.doctor_id = d.id
        WHERE a.appointment_date = ?
        AND a.status != 'cancelled'
        ORDER BY a.appointment_time
    ");
    
    $stmt->bind_param('s', $date);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $appointments = [];
    while ($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }
    
    sendSuccess($appointments);
}

function getCalendarData($date) {
    $conn = getDBConnection();
    
    // Get providers
    $providersQuery = "SELECT id, nombre_completo as nombre, especialidad 
                      FROM doctores 
                      ORDER BY especialidad, nombre_completo
                      LIMIT 50";
    $providersResult = $conn->query($providersQuery);
    $providers = [];
    while ($row = $providersResult->fetch_assoc()) {
        $providers[] = $row;
    }
    
    // Get appointments
    $stmt = $conn->prepare("
        SELECT 
            a.id,
            a.appointment_id,
            a.doctor_id,
            a.patient_id,
            a.appointment_date,
            a.appointment_time,
            a.duration_minutes,
            a.appointment_type,
            a.status,
            a.chief_complaint,
            CONCAT(p.first_name, ' ', p.last_name) as patient_name,
            d.nombre_completo as doctor_name
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctores d ON a.doctor_id = d.id
        WHERE a.appointment_date = ?
        AND a.status != 'cancelled'
        ORDER BY a.appointment_time
    ");
    
    $stmt->bind_param('s', $date);
    $stmt->execute();
    $appointmentsResult = $stmt->get_result();
    
    $appointments = [];
    while ($row = $appointmentsResult->fetch_assoc()) {
        $appointments[] = $row;
    }
    
    sendSuccess([
        'providers' => $providers,
        'appointments' => $appointments,
        'date' => $date
    ]);
}
?>
