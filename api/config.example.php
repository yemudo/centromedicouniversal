<?php
/**
 * Configuration Example File - Centro Médico Universal
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to config.php
 * 2. Replace the placeholder values with your actual credentials
 * 3. config.php is in .gitignore and will not be committed
 */

// Twilio Configuration
define('TWILIO_ACCOUNT_SID', 'YOUR_TWILIO_ACCOUNT_SID_HERE');
define('TWILIO_AUTH_TOKEN', 'YOUR_TWILIO_AUTH_TOKEN_HERE');
define('TWILIO_PHONE_FROM', 'YOUR_TWILIO_PHONE_NUMBER');

// SendGrid Configuration  
define('SENDGRID_API_KEY', 'YOUR_SENDGRID_API_KEY_HERE');

// Email Configuration
define('EMAIL_FROM', 'info@centromedicouniversal.com');
define('EMAIL_FROM_NAME', 'Centro Médico Universal');
define('EMAIL_REPLY_TO', 'info@centromedicouniversal.com');

// Center Information
define('CENTER_NAME', 'Centro Médico Universal Castillo Rodríguez y Asociados');
define('CENTER_ADDRESS', 'Calle José Reyes #11, Santiago');
define('CENTER_PHONE', '(809) 594-6161');
define('CENTER_WHATSAPP', '+1 (809) 350-9302');

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'centro_medico_universal');
define('DB_USER', 'YOUR_DB_USER');
define('DB_PASS', 'YOUR_DB_PASSWORD');
