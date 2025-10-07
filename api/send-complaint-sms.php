<?php
/**
 * Twilio SMS API - Send Complaints to Director
 * Centro Médico Universal
 * 
 * This receives complaints from Nivín and sends them via Twilio SMS
 * to the director's phone: +1 (809) 350-9302
 */

// CORS headers for frontend access
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Twilio credentials
define('TWILIO_ACCOUNT_SID', 'AC487f8fc4fc5d48969fcf3fc82d2d092');
define('TWILIO_AUTH_TOKEN', 'df063ef648460977bd805544669963cb');
define('TWILIO_PHONE', '+18779397539'); // Your Twilio toll-free number
define('DIRECTOR_PHONE', '+18093509302'); // Director's phone

/**
 * Send SMS via Twilio REST API
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
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        return ['success' => false, 'error' => $error];
    }
    
    $result = json_decode($response, true);
    
    if ($httpCode === 201 || $httpCode === 200) {
        return ['success' => true, 'sid' => $result['sid'] ?? null];
    } else {
        return ['success' => false, 'error' => $result['message'] ?? 'Unknown error', 'code' => $result['code'] ?? null];
    }
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['complaint'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing complaint data']);
        exit();
    }
    
    $complaint = $input['complaint'];
    
    // Build SMS message (160 characters per segment)
    $smsMessage = "NUEVA QUEJA - Centro Medico Universal\n\n";
    
    if (!empty($complaint['name'])) {
        $smsMessage .= "Paciente: {$complaint['name']}\n";
    }
    
    if (!empty($complaint['phone'])) {
        $smsMessage .= "Tel: {$complaint['phone']}\n";
    }
    
    $smsMessage .= "\nQUEJA:\n" . substr($complaint['message'], 0, 200) . "\n\n";
    $smsMessage .= "Fecha: " . date('d/m/Y H:i') . "\n";
    $smsMessage .= "ID: Q" . date('Ymd') . "-" . substr(uniqid(), -4);
    
    // Send SMS via Twilio
    $result = sendTwilioSMS(DIRECTOR_PHONE, $smsMessage);
    
    if ($result['success']) {
        // Log successful send
        $logEntry = date('[Y-m-d H:i:s]') . " SMS SENT - ID: {$result['sid']}\n";
        $logEntry .= "To: " . DIRECTOR_PHONE . "\n";
        $logEntry .= "Complaint: " . substr($complaint['message'], 0, 50) . "...\n\n";
        
        @file_put_contents(__DIR__ . '/sms_log.txt', $logEntry, FILE_APPEND);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'SMS enviado al director exitosamente',
            'sid' => $result['sid'],
            'type' => 'sms'
        ]);
    } else {
        // Log error
        $logEntry = date('[Y-m-d H:i:s]') . " SMS FAILED\n";
        $logEntry .= "Error: {$result['error']}\n";
        if (isset($result['code'])) {
            $logEntry .= "Code: {$result['code']}\n";
        }
        $logEntry .= "\n";
        
        @file_put_contents(__DIR__ . '/sms_errors.txt', $logEntry, FILE_APPEND);
        
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al enviar SMS: ' . $result['error'],
            'code' => $result['code'] ?? null
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error del servidor: ' . $e->getMessage()
    ]);
}
?>
