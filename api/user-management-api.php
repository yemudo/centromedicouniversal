<?php
// NIVIN EMR - User Management API
// Centro Médico Universal
// Handles CRUD operations for users

require_once 'oracle-config.php';

session_start();

// Check if user is authenticated and is super admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'super_admin') {
    sendError('Unauthorized - Super Admin access required', 403);
}

$method = $_SERVER['REQUEST_METHOD'];
$conn = getOracleDBConnection();

if ($method === 'GET') {
    // GET ALL USERS
    $stmt = $conn->prepare("
        SELECT id, username, full_name, email, role, is_active, created_at, updated_at
        FROM users 
        ORDER BY created_at DESC
    ");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    sendSuccess(['users' => $users], 'Users retrieved successfully');
    
} elseif ($method === 'POST') {
    // CREATE NEW USER
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!isset($data['username']) || !isset($data['password']) || !isset($data['email']) || 
        !isset($data['full_name']) || !isset($data['role'])) {
        sendError('Missing required fields');
    }
    
    $username = trim($data['username']);
    $password = $data['password'];
    $email = trim($data['email']);
    $fullName = trim($data['full_name']);
    $role = $data['role'];
    $isActive = isset($data['is_active']) ? (int)$data['is_active'] : 1;
    
    // Validate password strength
    if (strlen($password) < 8) {
        sendError('Password must be at least 8 characters long');
    }
    
    // Check if username already exists
    $checkStmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $checkStmt->bind_param('s', $username);
    $checkStmt->execute();
    if ($checkStmt->get_result()->num_rows > 0) {
        sendError('Username already exists');
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
    // Insert user
    $stmt = $conn->prepare("
        INSERT INTO users (username, password, full_name, email, role, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    ");
    $stmt->bind_param('sssssi', $username, $hashedPassword, $fullName, $email, $role, $isActive);
    
    if ($stmt->execute()) {
        $userId = $conn->insert_id;
        
        // Insert permissions
        if (isset($data['permissions']) && is_array($data['permissions'])) {
            $permStmt = $conn->prepare("INSERT INTO user_permissions (user_id, permission) VALUES (?, ?)");
            foreach ($data['permissions'] as $permission) {
                $permStmt->bind_param('is', $userId, $permission);
                $permStmt->execute();
            }
        }
        
        sendSuccess([
            'id' => $userId,
            'username' => $username,
            'full_name' => $fullName,
            'email' => $email,
            'role' => $role
        ], 'User created successfully');
    } else {
        sendError('Failed to create user: ' . $conn->error);
    }
    
} elseif ($method === 'PUT') {
    // UPDATE USER
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        sendError('User ID is required');
    }
    
    $userId = (int)$data['id'];
    
    // Don't allow editing super admin
    if ($userId === 1) {
        sendError('Cannot edit super admin account');
    }
    
    // Build update query
    $updates = [];
    $types = '';
    $values = [];
    
    if (isset($data['username'])) {
        $updates[] = 'username = ?';
        $types .= 's';
        $values[] = trim($data['username']);
    }
    
    if (isset($data['full_name'])) {
        $updates[] = 'full_name = ?';
        $types .= 's';
        $values[] = trim($data['full_name']);
    }
    
    if (isset($data['email'])) {
        $updates[] = 'email = ?';
        $types .= 's';
        $values[] = trim($data['email']);
    }
    
    if (isset($data['role'])) {
        $updates[] = 'role = ?';
        $types .= 's';
        $values[] = $data['role'];
    }
    
    if (isset($data['is_active'])) {
        $updates[] = 'is_active = ?';
        $types .= 'i';
        $values[] = (int)$data['is_active'];
    }
    
    if (isset($data['password']) && !empty($data['password'])) {
        $updates[] = 'password = ?';
        $types .= 's';
        $values[] = password_hash($data['password'], PASSWORD_BCRYPT);
    }
    
    $updates[] = 'updated_at = NOW()';
    
    $values[] = $userId;
    $types .= 'i';
    
    $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$values);
    
    if ($stmt->execute()) {
        // Update permissions
        if (isset($data['permissions'])) {
            // Delete old permissions
            $delStmt = $conn->prepare("DELETE FROM user_permissions WHERE user_id = ?");
            $delStmt->bind_param('i', $userId);
            $delStmt->execute();
            
            // Insert new permissions
            if (is_array($data['permissions'])) {
                $permStmt = $conn->prepare("INSERT INTO user_permissions (user_id, permission) VALUES (?, ?)");
                foreach ($data['permissions'] as $permission) {
                    $permStmt->bind_param('is', $userId, $permission);
                    $permStmt->execute();
                }
            }
        }
        
        sendSuccess(['id' => $userId], 'User updated successfully');
    } else {
        sendError('Failed to update user: ' . $conn->error);
    }
    
} elseif ($method === 'DELETE') {
    // DELETE USER
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        sendError('User ID is required');
    }
    
    $userId = (int)$data['id'];
    
    // Don't allow deleting super admin
    if ($userId === 1) {
        sendError('Cannot delete super admin account');
    }
    
    // Delete user permissions first
    $permStmt = $conn->prepare("DELETE FROM user_permissions WHERE user_id = ?");
    $permStmt->bind_param('i', $userId);
    $permStmt->execute();
    
    // Delete user
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param('i', $userId);
    
    if ($stmt->execute()) {
        sendSuccess(['id' => $userId], 'User deleted successfully');
    } else {
        sendError('Failed to delete user: ' . $conn->error);
    }
}
?>
