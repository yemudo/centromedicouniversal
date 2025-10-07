<?php
// PASSWORD RESET API - CENTRO MÉDICO UNIVERSAL
// Handles password reset with SMS/Email code verification

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'db-config.php';
require_once __DIR__ . '/api/config.php';
require_once '/var/www/html/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// Use config values
define('TWILIO_SID', TWILIO_ACCOUNT_SID);
define('TWILIO_TOKEN', TWILIO_AUTH_TOKEN);
define('TWILIO_PHONE', '+18779397539');

// Hardcoded superadmin phone for Manuel Castillo
define('SUPERADMIN_PHONE', '+19738666696');

$action = $_POST['action'] ?? '';

switch ($action) {
    case 'request_reset':
        requestPasswordReset();
        break;
    case 'verify_code':
        verifyResetCode();
        break;
    case 'reset_password':
        resetPassword();
        break;
    default:
        sendError('Invalid action');
}

function requestPasswordReset() {
    global $conn;
    
    $username = trim($_POST['username'] ?? '');
    
    if (empty($username)) {
        sendError('Username is required');
    }
    
    // Get user details
    $conn = getDBConnection();
    $stmt = $conn->prepare("
        SELECT id, username, full_name, email, phone, role 
        FROM users 
        WHERE username = ? 
        AND is_active = 1 
        AND (locked_until IS NULL OR locked_until < NOW())
    ");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Usuario no encontrado o cuenta bloqueada');
    }
    
    $user = $result->fetch_assoc();
    
    // Generate 6-digit code
    $resetCode = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    $expiresAt = date('Y-m-d H:i:s', strtotime('+10 minutes'));
    
    // Determine phone number - use superadmin phone or user's phone
    $phone = ($user['role'] === 'super_admin') ? SUPERADMIN_PHONE : ($user['phone'] ?? SUPERADMIN_PHONE);
    
    // Delete old reset codes for this user
    $stmt = $conn->prepare("DELETE FROM password_reset_codes WHERE user_id = ?");
    $stmt->bind_param("i", $user['id']);
    $stmt->execute();
    
    // Store reset code
    $stmt = $conn->prepare("
        INSERT INTO password_reset_codes 
        (user_id, code, phone, expires_at)
        VALUES (?, ?, ?, ?)
    ");
    
    $stmt->bind_param(
        "isss",
        $user['id'],
        $resetCode,
        $phone,
        $expiresAt
    );
    
    if (!$stmt->execute()) {
        sendError('Error al crear solicitud de restablecimiento');
    }
    
    // Send code via SMS (if phone available)
    $smsSent = false;
    if ($phone) {
        $smsSent = sendSMS($phone, $resetCode, $user['full_name']);
    }
    
    // Send code via Email  
    $emailSent = sendEmail($user['email'], $resetCode, $user['full_name']);
    
    sendSuccess([
        'user_id' => $user['id'],
        'sms_sent' => $smsSent,
        'email_sent' => $emailSent,
        'expires_in' => 600, // 10 minutes
        'code' => $resetCode // TEMPORARY: Show code for testing
    ], 'Código de verificación enviado');
}

function verifyResetCode() {
    $conn = getDBConnection();
    
    $username = trim($_POST['username'] ?? '');
    $code = trim($_POST['code'] ?? '');
    
    if (empty($username) || empty($code)) {
        sendError('Usuario y código son requeridos');
    }
    
    // Check code
    $stmt = $conn->prepare("
        SELECT prc.*, u.id as user_id, u.username
        FROM password_reset_codes prc
        JOIN users u ON prc.user_id = u.id
        WHERE u.username = ? 
        AND prc.code = ? 
        AND prc.expires_at > NOW()
        AND prc.used = 0
    ");
    $stmt->bind_param("ss", $username, $code);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Código inválido o expirado');
    }
    
    $resetData = $result->fetch_assoc();
    
    // Generate token for password reset
    $resetToken = bin2hex(random_bytes(32));
    $tokenExpires = date('Y-m-d H:i:s', strtotime('+30 minutes'));
    
    // Store token
    $stmt = $conn->prepare("
        INSERT INTO password_reset_tokens (user_id, token, expires_at)
        VALUES (?, ?, ?)
    ");
    $stmt->bind_param("iss", $resetData['user_id'], $resetToken, $tokenExpires);
    $stmt->execute();
    
    // Mark code as used
    $stmt = $conn->prepare("
        UPDATE password_reset_codes 
        SET used = 1 
        WHERE id = ?
    ");
    $stmt->bind_param("i", $resetData['id']);
    $stmt->execute();
    
    sendSuccess([
        'token' => $resetToken,
        'username' => $resetData['username']
    ], 'Código verificado correctamente');
}

function resetPassword() {
    $conn = getDBConnection();
    
    $token = trim($_POST['token'] ?? '');
    $newPassword = trim($_POST['new_password'] ?? '');
    
    if (empty($token) || empty($newPassword)) {
        sendError('Token y nueva contraseña son requeridos');
    }
    
    if (strlen($newPassword) < 8) {
        sendError('La contraseña debe tener al menos 8 caracteres');
    }
    
    // Verify token
    $stmt = $conn->prepare("
        SELECT * FROM password_reset_tokens 
        WHERE token = ? 
        AND expires_at > NOW()
        AND used = 0
    ");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Token inválido o expirado');
    }
    
    $resetData = $result->fetch_assoc();
    
    // Hash new password
    $passwordHash = password_hash($newPassword, PASSWORD_BCRYPT);
    
    // Update password
    $stmt = $conn->prepare("
        UPDATE users 
        SET password = ?,
            requires_password_change = 0,
            failed_login_attempts = 0,
            locked_until = NULL
        WHERE id = ?
    ");
    $stmt->bind_param("si", $passwordHash, $resetData['user_id']);
    
    if (!$stmt->execute()) {
        sendError('Error al actualizar contraseña');
    }
    
    // Mark token as used
    $stmt = $conn->prepare("
        UPDATE password_reset_tokens 
        SET used = 1 
        WHERE id = ?
    ");
    $stmt->bind_param("i", $resetData['id']);
    $stmt->execute();
    
    sendSuccess([
        'username' => $resetData['username']
    ], 'Contraseña restablecida exitosamente');
}

function sendSMS($phone, $code, $name) {
    $message = "Centro Médico Universal\n\nHola {$name},\n\nTu código de verificación es: {$code}\n\nExpira en 10 minutos.\n\nSi no solicitaste esto, ignora este mensaje.";
    
    try {
        $ch = curl_init("https://api.twilio.com/2010-04-01/Accounts/" . TWILIO_SID . "/Messages.json");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_USERPWD, TWILIO_SID . ":" . TWILIO_TOKEN);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'From' => TWILIO_PHONE,
            'To' => $phone,
            'Body' => $message
        ]));
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        return $httpCode === 201;
    } catch (Exception $e) {
        return false;
    }
}

function sendEmail($email, $code, $name) {
    // Use SendGrid API (free 100 emails/day)
    $apiKey = SENDGRID_API_KEY;
    
    // Fallback: If no API key, log the code (DEVELOPMENT ONLY)
    if ($apiKey === 'YOUR_SENDGRID_API_KEY_HERE' || empty($apiKey)) {
        error_log("========================================");
        error_log("PASSWORD RESET CODE FOR: $name ($email)");
        error_log("CODE: $code");
        error_log("========================================");
        return false; // Return false so user knows to check logs
    }
    
    $subject = "Código de Verificación - Centro Médico Universal";
    $htmlContent = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
            .header { background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
            .code-box { background: #2E7D32; color: white; padding: 25px; text-align: center; font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 25px 0; border-radius: 8px; font-family: 'Courier New', monospace; }
            .footer { color: #666; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1 style='margin:0; font-size: 24px;'>Centro Médico Universal</h1>
                <p style='margin: 10px 0 0 0; font-size: 14px;'>Sistema Nivín EMR</p>
            </div>
            <div class='content'>
                <h2 style='color: #2E7D32;'>Hola {$name},</h2>
                <p>Recibimos una solicitud para restablecer tu contraseña en el sistema Nivín EMR.</p>
                <p><strong>Tu código de verificación es:</strong></p>
                <div class='code-box'>{$code}</div>
                <p>Este código expira en <strong>10 minutos</strong>.</p>
                <div class='warning'>
                    <strong>⚠️ Importante:</strong> Si no solicitaste este restablecimiento, por favor ignora este correo e informa al departamento de IT inmediatamente.
                </div>
                <div class='footer'>
                    <p><strong>Centro Médico Universal</strong><br>
                    Sistema Nivín EMR<br>
                    Este es un correo automático, por favor no respondas.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $textContent = "Centro Médico Universal - Sistema Nivín EMR\n\nHola {$name},\n\nTu código de verificación es: {$code}\n\nEste código expira en 10 minutos.\n\nSi no solicitaste este restablecimiento, por favor ignora este correo.";
    
    $data = [
        'personalizations' => [[
            'to' => [['email' => $email, 'name' => $name]],
            'subject' => $subject
        ]],
        'from' => [
            'email' => 'nuelcastillo@centromedicouniversal.com',
            'name' => 'Centro Médico Universal - Nivín EMR'
        ],
        'content' => [
            ['type' => 'text/plain', 'value' => $textContent],
            ['type' => 'text/html', 'value' => $htmlContent]
        ]
    ];
    
    $ch = curl_init('https://api.sendgrid.com/v3/mail/send');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode >= 200 && $httpCode < 300) {
        return true;
    } else {
        error_log("SendGrid API error (HTTP $httpCode): $response");
        return false;
    }
}
?>
