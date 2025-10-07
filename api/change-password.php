<?php
// CHANGE PASSWORD API - DigitalOcean MySQL
require_once 'oracle-config.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Invalid request method', 405);
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    sendError('No autenticado', 401);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['newPassword']) || !isset($data['confirmPassword']) || !isset($data['captcha'])) {
    sendError('Todos los campos son requeridos', 400);
}

$newPassword = $data['newPassword'];
$confirmPassword = $data['confirmPassword'];
$captcha = $data['captcha'];
$userId = $_SESSION['user_id'];

// Verify captcha from session
if (!isset($_SESSION['captcha']) || strtolower($captcha) !== strtolower($_SESSION['captcha'])) {
    sendError('Código de verificación incorrecto', 400);
}

// Verify passwords match
if ($newPassword !== $confirmPassword) {
    sendError('Las contraseñas no coinciden', 400);
}

// Password validation
if (strlen($newPassword) < 8) {
    sendError('La contraseña debe tener al menos 8 caracteres', 400);
}

if (!preg_match('/[A-Z]/', $newPassword)) {
    sendError('La contraseña debe contener al menos una mayúscula', 400);
}

if (!preg_match('/[a-z]/', $newPassword)) {
    sendError('La contraseña debe contener al menos una minúscula', 400);
}

if (!preg_match('/[0-9]/', $newPassword)) {
    sendError('La contraseña debe contener al menos un número', 400);
}

// Hash the new password
$passwordHash = password_hash($newPassword, PASSWORD_BCRYPT);

// Get connection
$conn = getDigitalOceanDBConnection();

// Update password
$stmt = $conn->prepare("
    UPDATE employees 
    SET password_hash = ?, 
        requires_password_change = 0,
        password_expiry_date = DATE_ADD(CURRENT_DATE, INTERVAL 90 DAY)
    WHERE id = ?
");
$stmt->bind_param('si', $passwordHash, $userId);

if ($stmt->execute()) {
    // Log password change
    $logStmt = $conn->prepare("
        INSERT INTO password_history (employee_id, password_hash, changed_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
    ");
    $logStmt->bind_param('is', $userId, $passwordHash);
    $logStmt->execute();
    
    // Clear captcha
    unset($_SESSION['captcha']);
    
    // Destroy session - force re-login
    session_destroy();
    
    sendSuccess([], 'Contraseña cambiada exitosamente. Por favor inicie sesión nuevamente.');
} else {
    sendError('Error al cambiar la contraseña', 500);
}
?>
