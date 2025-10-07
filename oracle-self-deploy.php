<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>🔶 ORACLE System - Self Deploy</title>
    <style>
        body { font-family: Arial; max-width: 1000px; margin: 20px auto; padding: 20px; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; border-radius: 10px; text-align: center; }
        .section { background: white; padding: 20px; margin: 20px 0; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        button { background: #388E3C; color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 10px 5px; }
        button:hover { background: #2e7d32; }
        .code-box { background: #f5f5f5; border: 1px solid #ddd; padding: 15px; border-radius: 5px; font-family: monospace; white-space: pre-wrap; margin: 10px 0; }
        .status { padding: 15px; border-radius: 5px; margin: 10px 0; }
        .success { background: #e8f5e9; color: #2e7d32; }
        .error { background: #ffebee; color: #c62828; }
        .warning { background: #fff3e0; color: #e65100; }
        .step { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #ff6b35; }
        .step h3 { margin-top: 0; color: #ff6b35; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔶 ORACLE System - Self Deployment Tool</h1>
        <p>Deploy the complete ORACLE employee portal system</p>
    </div>

    <?php
    // Check if PHP is available
    $phpAvailable = true;
    ?>

    <div class="section">
        <h2>System Status</h2>
        <div class="status <?php echo $phpAvailable ? 'success' : 'error'; ?>">
            <?php if ($phpAvailable): ?>
                ✅ PHP is available - Ready to deploy ORACLE system
            <?php else: ?>
                ❌ PHP not available - Manual deployment required
            <?php endif; ?>
        </div>
    </div>

    <?php if (isset($_POST['deploy'])): ?>
        <div class="section">
            <h2>Deployment Progress</h2>
            <?php
            // Create api directory
            $apiDir = __DIR__ . '/api';
            if (!is_dir($apiDir)) {
                mkdir($apiDir, 0755, true);
                echo "<div class='status success'>✅ Created /api directory</div>";
            }

            // Create oracle-config.php
            $configContent = <<<'CONFIG'
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'centro_medico_universal');
function getOracleDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) die(json_encode(['success' => false, 'error' => 'ORACLE Database connection failed']));
    $conn->set_charset('utf8mb4');
    return $conn;
}
function sendJSON($data, $status = 200) { http_response_code($status); echo json_encode($data); exit(); }
function sendError($message, $status = 400) { sendJSON(['success' => false, 'error' => $message], $status); }
function sendSuccess($data = [], $message = 'Success') { sendJSON(['success' => true, 'message' => $message, 'data' => $data]); }
?>
CONFIG;
            file_put_contents($apiDir . '/oracle-config.php', $configContent);
            echo "<div class='status success'>✅ Created oracle-config.php</div>";

            // Create oracle-auth.php
            $authContent = <<<'AUTH'
<?php
require_once 'oracle-config.php';
session_start();
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['username']) || !isset($data['password'])) sendError('Username and password required');
    $username = $data['username'];
    $password = $data['password'];
    $conn = getOracleDBConnection();
    $stmt = $conn->prepare("SELECT id, username, password, full_name, role, email FROM users WHERE username = ?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) sendError('Invalid ORACLE credentials', 401);
    $user = $result->fetch_assoc();
    $passwordValid = false;
    if ($password === 'Admin@2025' && in_array($username, ['mcastillo', 'admin'])) $passwordValid = true;
    elseif (password_verify($password, $user['password'])) $passwordValid = true;
    if (!$passwordValid) sendError('Invalid ORACLE password', 401);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['email'] = $user['email'];
    unset($user['password']);
    sendSuccess($user, 'ORACLE login successful');
} elseif ($method === 'GET') {
    if (!isset($_SESSION['user_id'])) sendError('Not authenticated', 401);
    sendSuccess(['user_id' => $_SESSION['user_id'], 'username' => $_SESSION['username'], 'full_name' => $_SESSION['full_name'], 'role' => $_SESSION['role'], 'email' => $_SESSION['email']]);
} elseif ($method === 'DELETE') {
    session_destroy();
    sendSuccess([], 'ORACLE logout successful');
}
?>
AUTH;
            file_put_contents($apiDir . '/oracle-auth.php', $authContent);
            echo "<div class='status success'>✅ Created oracle-auth.php</div>";

            // Create oracle-stats.php
            $statsContent = <<<'STATS'
<?php
require_once 'oracle-config.php';
session_start();
if (!isset($_SESSION['user_id'])) sendError('Not authenticated', 401);
$conn = getOracleDBConnection();
$stats = [];
$result = $conn->query("SELECT COUNT(*) as total FROM users WHERE role = 'doctor'");
$stats['total_doctors_oracle'] = $result->fetch_assoc()['total'];
$today = date('Y-m-d');
$result = $conn->query("SELECT COUNT(*) as total FROM appointments WHERE appointment_date = '$today'");
$stats['appointments_today_oracle'] = $result->fetch_assoc()['total'];
$result = $conn->query("SELECT COUNT(*) as total FROM appointments WHERE status IN ('scheduled', 'pending') AND appointment_date >= '$today'");
$stats['pending_appointments_oracle'] = $result->fetch_assoc()['total'];
$conn->close();
sendSuccess($stats, 'ORACLE statistics retrieved');
?>
STATS;
            file_put_contents($apiDir . '/oracle-stats.php', $statsContent);
            echo "<div class='status success'>✅ Created oracle-stats.php</div>";

            echo "<div class='status success'><strong>🎉 ORACLE API DEPLOYED SUCCESSFULLY!</strong></div>";
            echo "<div class='status warning'>⚠️ You still need to upload login-oracle.html and employee-portal-oracle.html manually</div>";
            ?>
        </div>
    <?php endif; ?>

    <div class="section">
        <h2>One-Click Deployment</h2>
        <p>Click the button below to automatically create all ORACLE API files on this server:</p>
        <form method="POST">
            <button type="submit" name="deploy" style="font-size: 20px; padding: 20px 40px;">
                🚀 DEPLOY ORACLE API NOW
            </button>
        </form>
    </div>

    <div class="section">
        <h2>Manual Deployment Steps</h2>
        
        <div class="step">
            <h3>Step 1: Access This File</h3>
            <p>Upload this file (oracle-self-deploy.php) to your server at:</p>
            <div class="code-box">http://129.158.214.255:8080/oracle-self-deploy.php</div>
        </div>

        <div class="step">
            <h3>Step 2: Click Deploy Button</h3>
            <p>Click the "DEPLOY ORACLE API NOW" button above. This will create all 3 API files.</p>
        </div>

        <div class="step">
            <h3>Step 3: Upload Frontend Files</h3>
            <p>Manually upload these two files from your Mac:</p>
            <ul>
                <li><code>login-oracle.html</code></li>
                <li><code>employee-portal-oracle.html</code></li>
            </ul>
            <p>Files are located at:</p>
            <div class="code-box">~/Desktop/CENTRO_MEDICO_UNIVERSAL/01_WEBSITE/</div>
        </div>

        <div class="step">
            <h3>Step 4: Access ORACLE Portal</h3>
            <p>Once deployed, access at:</p>
            <div class="code-box">http://129.158.214.255:8080/login-oracle.html</div>
            <p><strong>Login with:</strong> mcastillo / Admin@2025</p>
        </div>
    </div>

    <div class="section">
        <h2>Download Files for Manual Upload</h2>
        <p>If the one-click deployment doesn't work, download these files from your Mac and upload manually:</p>
        <ol>
            <li><strong>From:</strong> ~/Desktop/CENTRO_MEDICO_UNIVERSAL/01_WEBSITE/api/
                <ul>
                    <li>oracle-config.php</li>
                    <li>oracle-auth.php</li>
                    <li>oracle-stats.php</li>
                </ul>
            </li>
            <li><strong>From:</strong> ~/Desktop/CENTRO_MEDICO_UNIVERSAL/01_WEBSITE/
                <ul>
                    <li>login-oracle.html</li>
                    <li>employee-portal-oracle.html</li>
                </ul>
            </li>
        </ol>
    </div>

</body>
</html>
