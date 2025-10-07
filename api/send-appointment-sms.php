<?php
/**
 * Twilio SMS Appointment Confirmation System
 * Centro Médico Universal Castillo Rodríguez y Asociados
 * 
 * Sends SMS confirmations when appointments are booked through Nivín
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Load configuration
require_once __DIR__ . '/config.php';

// Additional configuration
define('TWILIO_PHONE', '+18779397539'); // Toll-Free number
define('DIRECTOR_PHONE', '+18093509302'); // For notifications

// Log file
define('SMS_LOG_FILE', __DIR__ . '/appointment_sms_log.txt');
define('SMS_ERROR_FILE', __DIR__ . '/appointment_sms_errors.txt');

/**
 * Send SMS using Twilio REST API
 */
function sendTwilioSMS($to, $message) {
    $url = 'https://api.twilio.com/2010-04-01/Accounts/' . TWILIO_ACCOUNT_SID . '/Messages.json';
    
    $data = [
        'From' => TWILIO_PHONE,
        'To' => $to,
        'Body' => $message
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_USERPWD, TWILIO_ACCOUNT_SID . ':' . TWILIO_AUTH_TOKEN);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        throw new Exception("cURL Error: $error");
    }
    
    if ($httpCode !== 201) {
        $responseData = json_decode($response, true);
        $errorMsg = isset($responseData['message']) ? $responseData['message'] : 'Unknown error';
        throw new Exception("Twilio Error ($httpCode): $errorMsg");
    }
    
    $result = json_decode($response, true);
    return $result['sid'] ?? 'unknown';
}

/**
 * Log SMS activity
 */
function logSMS($type, $data) {
    $timestamp = date('Y-m-d H:i:s');
    $logFile = ($type === 'error') ? SMS_ERROR_FILE : SMS_LOG_FILE;
    $message = "[$timestamp] " . json_encode($data) . "\n";
    file_put_contents($logFile, $message, FILE_APPEND);
}

/**
 * Format phone number to E.164 format
 */
function formatPhoneNumber($phone) {
    // Remove all non-numeric characters
    $phone = preg_replace('/[^0-9]/', '', $phone);
    
    // If it starts with 809, 829, 849 (Dominican Republic), add +1
    if (preg_match('/^(809|829|849)/', $phone)) {
        return '+1' . $phone;
    }
    
    // If it's 10 digits and doesn't start with 1, assume US/DR
    if (strlen($phone) === 10) {
        return '+1' . $phone;
    }
    
    // If it already has country code
    if (strlen($phone) === 11 && $phone[0] === '1') {
        return '+' . $phone;
    }
    
    // Default: add +1
    return '+1' . $phone;
}

/**
 * Main request handler
 */
try {
    // Only accept POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST requests allowed');
    }
    
    // Get JSON data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON data');
    }
    
    // Validate required fields
    $required = ['patient_name', 'patient_phone', 'doctor_name', 'appointment_date', 'appointment_time'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }
    
    // Extract data
    $patientName = $data['patient_name'];
    $patientPhone = formatPhoneNumber($data['patient_phone']);
    $doctorName = $data['doctor_name'];
    $appointmentDate = $data['appointment_date'];
    $appointmentTime = $data['appointment_time'];
    $specialty = $data['specialty'] ?? 'No especificada';
    $appointmentId = $data['appointment_id'] ?? 'N/A';
    
    // Format date to Spanish
    $dateObj = new DateTime($appointmentDate);
    $months = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
               'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    $day = $dateObj->format('j');
    $month = $months[(int)$dateObj->format('n')];
    $year = $dateObj->format('Y');
    $dateSpanish = "$day de $month, $year";
    
    // Format time to 12-hour format
    $timeObj = new DateTime($appointmentTime);
    $timeFormatted = $timeObj->format('g:i A');
    
    // Create SMS message for PATIENT
    $patientMessage = "✅ CITA CONFIRMADA - Centro Médico Universal\n\n";
    $patientMessage .= "Paciente: $patientName\n";
    $patientMessage .= "Doctor(a): $doctorName\n";
    $patientMessage .= "Especialidad: $specialty\n\n";
    $patientMessage .= "📅 Fecha: $dateSpanish\n";
    $patientMessage .= "🕐 Hora: $timeFormatted\n\n";
    $patientMessage .= "📍 Dirección: Av. Sarasota #44, La Vega\n";
    $patientMessage .= "📞 Teléfono: (809) 594-6161\n\n";
    $patientMessage .= "Para cambios, llámenos con 24h de anticipación.\n";
    $patientMessage .= "ID de Cita: $appointmentId";
    
    // Send SMS to patient
    $smsSid = sendTwilioSMS($patientPhone, $patientMessage);
    
    // Log success
    logSMS('success', [
        'type' => 'appointment_confirmation',
        'patient' => $patientName,
        'phone' => $patientPhone,
        'doctor' => $doctorName,
        'date' => $appointmentDate,
        'time' => $appointmentTime,
        'sms_sid' => $smsSid
    ]);
    
    // OPTIONAL: Send notification to director/admin
    $notifyAdmin = $data['notify_admin'] ?? false;
    if ($notifyAdmin) {
        $adminMessage = "📅 NUEVA CITA AGENDADA\n\n";
        $adminMessage .= "Paciente: $patientName\n";
        $adminMessage .= "Doctor(a): $doctorName\n";
        $adminMessage .= "Fecha: $dateSpanish a las $timeFormatted\n";
        $adminMessage .= "Teléfono: $patientPhone\n";
        $adminMessage .= "ID: $appointmentId";
        
        try {
            $adminSid = sendTwilioSMS(DIRECTOR_PHONE, $adminMessage);
            logSMS('success', [
                'type' => 'admin_notification',
                'appointment_id' => $appointmentId,
                'sms_sid' => $adminSid
            ]);
        } catch (Exception $e) {
            // Log but don't fail the whole request
            logSMS('error', [
                'type' => 'admin_notification_failed',
                'error' => $e->getMessage()
            ]);
        }
    }
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'SMS confirmación enviado exitosamente',
        'sms_sid' => $smsSid,
        'patient_phone' => $patientPhone,
        'appointment_id' => $appointmentId
    ]);
    
} catch (Exception $e) {
    // Log error
    logSMS('error', [
        'error' => $e->getMessage(),
        'data' => $data ?? []
    ]);
    
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
