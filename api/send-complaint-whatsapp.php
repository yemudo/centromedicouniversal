<?php
/**
 * Twilio WhatsApp API - Send Complaints to Director
 * Centro Médico Universal
 * 
 * This receives complaints from Nivín and sends them via Twilio WhatsApp
 * to the director's WhatsApp: +1 (809) 350-9302
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
define('TWILIO_WHATSAPP', 'whatsapp:+14155238886'); // Twilio Sandbox
define('DIRECTOR_WHATSAPP', 'whatsapp:+18093509302');

/**
 * Send WhatsApp via Twilio REST API
 */
function sendTwilioWhatsApp($to, $message) {
    $url = 'https://api.twilio.com/2010-04-01/Accounts/' . TWILIO_ACCOUNT_SID . '/Messages.json';
    
    $data = [
        'From' => TWILIO_WHATSAPP,
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
    
    // Build WhatsApp message with better formatting
    $whatsappMessage = "🚨 *NUEVA QUEJA*\n";
    $whatsappMessage .= "Centro Médico Universal\n\n";
    
    if (!empty($complaint['name'])) {
        $whatsappMessage .= "👤 *Paciente:* {$complaint['name']}\n";
    }
    
    if (!empty($complaint['phone'])) {
        $whatsappMessage .= "📞 *Teléfono:* {$complaint['phone']}\n";
    }
    
    $whatsappMessage .= "\n📝 *QUEJA:*\n{$complaint['message']}\n\n";
    $whatsappMessage .= "📅 *Fecha:* " . date('d/m/Y H:i') . "\n";
    $whatsappMessage .= "🆔 *ID:* Q" . date('Ymd') . "-" . substr(uniqid(), -4);
    
    // Send WhatsApp via Twilio
    $result = sendTwilioWhatsApp(DIRECTOR_WHATSAPP, $whatsappMessage);
    
    if ($result['success']) {
        // Log successful send
        $logEntry = date('[Y-m-d H:i:s]') . " WHATSAPP SENT - ID: {$result['sid']}\n";
        $logEntry .= "To: " . DIRECTOR_WHATSAPP . "\n";
        $logEntry .= "Complaint: " . substr($complaint['message'], 0, 50) . "...\n\n";
        
        @file_put_contents(__DIR__ . '/whatsapp_log.txt', $logEntry, FILE_APPEND);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'WhatsApp enviado al director exitosamente',
            'sid' => $result['sid'],
            'type' => 'whatsapp'
        ]);
    } else {
        // Log error
        $logEntry = date('[Y-m-d H:i:s]') . " WHATSAPP FAILED\n";
        $logEntry .= "Error: {$result['error']}\n";
        if (isset($result['code'])) {
            $logEntry .= "Code: {$result['code']}\n";
        }
        $logEntry .= "\n";
        
        @file_put_contents(__DIR__ . '/whatsapp_errors.txt', $logEntry, FILE_APPEND);
        
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al enviar WhatsApp: ' . $result['error'],
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
