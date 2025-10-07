<?php
/**
 * Appointment Notification System
 * Centro Médico Universal
 * 
 * Sends SMS and Email confirmations when appointments are booked
 * 
 * Features:
 * - Twilio SMS notifications
 * - Email confirmations
 * - Spanish language templates
 * - Error handling and logging
 */

// Load configuration
require_once __DIR__ . '/config.php';

/**
 * Send SMS notification via Twilio
 */
function sendSMSNotification($to, $message) {
    $url = 'https://api.twilio.com/2010-04-01/Accounts/' . TWILIO_ACCOUNT_SID . '/Messages.json';
    
    $data = [
        'From' => TWILIO_PHONE_FROM,
        'To' => $to,
        'Body' => $message
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_USERPWD, TWILIO_ACCOUNT_SID . ':' . TWILIO_AUTH_TOKEN);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'success' => $httpCode === 201,
        'response' => json_decode($response, true),
        'http_code' => $httpCode
    ];
}

/**
 * Send Email notification
 */
function sendEmailNotification($to, $subject, $htmlBody, $textBody = '') {
    $headers = [
        'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM . '>',
        'Reply-To: ' . EMAIL_REPLY_TO,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    $success = mail($to, $subject, $htmlBody, implode("\r\n", $headers));
    
    return [
        'success' => $success,
        'to' => $to,
        'subject' => $subject
    ];
}

/**
 * Build SMS message for appointment confirmation
 */
function buildAppointmentSMS($appointmentData) {
    $doctor = $appointmentData['doctor_name'];
    $date = date('d/m/Y', strtotime($appointmentData['appointment_date']));
    $time = date('g:i A', strtotime($appointmentData['appointment_time']));
    $confirmationId = $appointmentData['appointment_id'];
    
    $message = "✅ Cita confirmada\n\n";
    $message .= "👨‍⚕️ Doctor: $doctor\n";
    $message .= "📅 Fecha: $date\n";
    $message .= "🕐 Hora: $time\n";
    $message .= "🔢 Confirmación: #$confirmationId\n\n";
    $message .= CENTER_NAME . "\n";
    $message .= CENTER_ADDRESS . "\n";
    $message .= "📞 " . CENTER_PHONE;
    
    return $message;
}

/**
 * Build HTML email for appointment confirmation
 */
function buildAppointmentEmail($appointmentData) {
    $doctor = htmlspecialchars($appointmentData['doctor_name']);
    $specialty = htmlspecialchars($appointmentData['specialty']);
    $patient = htmlspecialchars($appointmentData['patient_name']);
    $date = date('d \d\e F, Y', strtotime($appointmentData['appointment_date']));
    $time = date('g:i A', strtotime($appointmentData['appointment_time']));
    $confirmationId = $appointmentData['appointment_id'];
    
    $html = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Cita</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); padding: 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Cita Confirmada</h1>
                            <p style="color: #e3f2fd; margin: 10px 0 0 0; font-size: 16px;">Su cita ha sido agendada exitosamente</p>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Estimado(a) $patient,</h2>
                            
                            <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0;">
                                Su cita médica ha sido confirmada con los siguientes detalles:
                            </p>
                            
                            <table width="100%" cellpadding="12" style="background-color: #f8f9fa; border-radius: 6px; margin-bottom: 30px;">
                                <tr>
                                    <td style="color: #666; padding: 15px;">
                                        <strong style="color: #333;">👨‍⚕️ Doctor:</strong><br>
                                        <span style="font-size: 18px; color: #007bff;">$doctor</span><br>
                                        <span style="color: #888;">$specialty</span>
                                    </td>
                                </tr>
                                <tr style="border-top: 1px solid #dee2e6;">
                                    <td style="color: #666; padding: 15px;">
                                        <strong style="color: #333;">📅 Fecha:</strong><br>
                                        <span style="font-size: 18px; color: #007bff;">$date</span>
                                    </td>
                                </tr>
                                <tr style="border-top: 1px solid #dee2e6;">
                                    <td style="color: #666; padding: 15px;">
                                        <strong style="color: #333;">🕐 Hora:</strong><br>
                                        <span style="font-size: 18px; color: #007bff;">$time</span>
                                    </td>
                                </tr>
                                <tr style="border-top: 1px solid #dee2e6;">
                                    <td style="color: #666; padding: 15px;">
                                        <strong style="color: #333;">🔢 Número de Confirmación:</strong><br>
                                        <span style="font-size: 20px; color: #28a745; font-weight: bold;">#$confirmationId</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="background-color: #e7f3ff; border-left: 4px solid #007bff; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
                                <p style="margin: 0; color: #004085; font-weight: bold;">📍 Ubicación:</p>
                                <p style="margin: 5px 0 0 0; color: #004085;">
                                    Centro Médico Universal<br>
                                    Calle José Reyes #11<br>
                                    Santiago, República Dominicana
                                </p>
                            </div>
                            
                            <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
                                <strong style="color: #333;">Recomendaciones importantes:</strong>
                            </p>
                            <ul style="color: #666; line-height: 1.8; margin: 0 0 30px 0;">
                                <li>Llegue 15 minutos antes de su cita</li>
                                <li>Traiga su cédula y tarjeta del seguro</li>
                                <li>Si tiene resultados de laboratorio, tráigalos</li>
                                <li>En caso de no poder asistir, favor cancelar con anticipación</li>
                            </ul>
                        </td>
                    </tr>
                    
                    <!-- Contact Info -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; border-top: 1px solid #dee2e6;">
                            <p style="margin: 0 0 15px 0; color: #666; text-align: center; font-weight: bold;">¿Necesita ayuda?</p>
                            <table width="100%" cellpadding="10">
                                <tr>
                                    <td align="center" style="color: #666;">
                                        📞 <strong>(809) 594-6161</strong>
                                    </td>
                                    <td align="center" style="color: #666;">
                                        📱 <strong>+1 (809) 350-9302</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="center" style="color: #666; padding-top: 10px;">
                                        📧 <a href="mailto:info@centromedicouniversal.com" style="color: #007bff; text-decoration: none;">info@centromedicouniversal.com</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #333; color: #fff; padding: 20px; text-align: center; font-size: 12px;">
                            <p style="margin: 0 0 10px 0;">Centro Médico Universal Castillo Rodríguez y Asociados</p>
                            <p style="margin: 0; color: #999;">© 2025 Todos los derechos reservados</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    
    return $html;
}

/**
 * Send complete appointment confirmation (SMS + Email)
 */
function sendAppointmentConfirmation($appointmentData) {
    $results = [
        'sms' => ['success' => false, 'message' => 'Not attempted'],
        'email' => ['success' => false, 'message' => 'Not attempted'],
        'overall_success' => false
    ];
    
    // Send SMS if phone number is provided
    if (!empty($appointmentData['patient_phone'])) {
        $phone = formatPhoneForTwilio($appointmentData['patient_phone']);
        $smsMessage = buildAppointmentSMS($appointmentData);
        $smsResult = sendSMSNotification($phone, $smsMessage);
        
        $results['sms'] = [
            'success' => $smsResult['success'],
            'message' => $smsResult['success'] ? 'SMS sent successfully' : 'SMS failed',
            'details' => $smsResult
        ];
    }
    
    // Send Email if email address is provided
    if (!empty($appointmentData['patient_email'])) {
        $emailSubject = "Confirmación de Cita - Centro Médico Universal";
        $emailBody = buildAppointmentEmail($appointmentData);
        $emailResult = sendEmailNotification($appointmentData['patient_email'], $emailSubject, $emailBody);
        
        $results['email'] = [
            'success' => $emailResult['success'],
            'message' => $emailResult['success'] ? 'Email sent successfully' : 'Email failed',
            'details' => $emailResult
        ];
    }
    
    // Consider successful if at least one notification was sent
    $results['overall_success'] = $results['sms']['success'] || $results['email']['success'];
    
    // Log the notification attempt
    logNotification($appointmentData, $results);
    
    return $results;
}

/**
 * Format phone number for Twilio (Dominican Republic)
 */
function formatPhoneForTwilio($phone) {
    // Remove all non-numeric characters
    $phone = preg_replace('/[^0-9]/', '', $phone);
    
    // If starts with 809/829/849, prepend +1
    if (preg_match('/^(809|829|849)/', $phone)) {
        return '+1' . $phone;
    }
    
    // If starts with 1809/1829/1849, prepend +
    if (preg_match('/^1(809|829|849)/', $phone)) {
        return '+' . $phone;
    }
    
    // If 10 digits starting with 809/829/849, prepend +1
    if (strlen($phone) === 10) {
        return '+1' . $phone;
    }
    
    // Return as-is (might fail, but let Twilio handle it)
    return '+' . $phone;
}

/**
 * Log notification attempt to database
 */
function logNotification($appointmentData, $results) {
    // This would connect to database and log the notification
    // For now, just log to file
    $logEntry = date('Y-m-d H:i:s') . ' - ' . 
                'Appointment #' . $appointmentData['appointment_id'] . ' - ' .
                'SMS: ' . ($results['sms']['success'] ? 'SUCCESS' : 'FAILED') . ' - ' .
                'Email: ' . ($results['email']['success'] ? 'SUCCESS' : 'FAILED') . "\n";
    
    error_log($logEntry, 3, '/var/log/cmu-notifications.log');
}

/**
 * Send cancellation notification
 */
function sendCancellationNotification($appointmentData, $reason = '') {
    $phone = $appointmentData['patient_phone'];
    $email = $appointmentData['patient_email'] ?? '';
    
    // SMS
    $smsMessage = "⚠️ Cita cancelada\n\n";
    $smsMessage .= "Su cita del " . date('d/m/Y', strtotime($appointmentData['appointment_date']));
    $smsMessage .= " a las " . date('g:i A', strtotime($appointmentData['appointment_time']));
    $smsMessage .= " con " . $appointmentData['doctor_name'] . " ha sido cancelada.\n\n";
    if ($reason) {
        $smsMessage .= "Motivo: $reason\n\n";
    }
    $smsMessage .= "Para reagendar, llámenos al " . CENTER_PHONE;
    
    $smsResult = null;
    if ($phone) {
        $phoneFormatted = formatPhoneForTwilio($phone);
        $smsResult = sendSMSNotification($phoneFormatted, $smsMessage);
    }
    
    return [
        'sms' => $smsResult,
        'email' => null  // Email template for cancellation to be added
    ];
}

/**
 * Send reminder notification (for future use)
 */
function sendReminderNotification($appointmentData, $hoursAhead = 24) {
    $phone = $appointmentData['patient_phone'];
    $date = date('d/m/Y', strtotime($appointmentData['appointment_date']));
    $time = date('g:i A', strtotime($appointmentData['appointment_time']));
    
    $smsMessage = "🔔 Recordatorio de Cita\n\n";
    $smsMessage .= "Su cita con " . $appointmentData['doctor_name'] . " es ";
    
    if ($hoursAhead <= 2) {
        $smsMessage .= "EN 2 HORAS\n\n";
    } elseif ($hoursAhead <= 24) {
        $smsMessage .= "MAÑANA\n\n";
    } else {
        $smsMessage .= "pronto\n\n";
    }
    
    $smsMessage .= "📅 $date a las $time\n";
    $smsMessage .= "📍 " . CENTER_ADDRESS . "\n\n";
    $smsMessage .= "Por favor llegue 15 minutos antes.";
    
    if ($phone) {
        $phoneFormatted = formatPhoneForTwilio($phone);
        return sendSMSNotification($phoneFormatted, $smsMessage);
    }
    
    return ['success' => false, 'message' => 'No phone number'];
}

// Export functions for use in other scripts
if (!function_exists('sendAppointmentConfirmation')) {
    // Already defined above
}
?>
