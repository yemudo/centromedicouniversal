// HIPAA-Compliant Authentication - Frontend
// Replaces hardcoded credentials with backend API calls

let currentUser = null;
let sessionId = null;

// HIPAA Password Validation (client-side)
function validateHIPAAPassword(password, username) {
    const errors = [];
    if (password.length < 12) errors.push('Mínimo 12 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('Una letra mayúscula');
    if (!/[a-z]/.test(password)) errors.push('Una letra minúscula');
    if (!/[0-9]/.test(password)) errors.push('Un número');
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push('Un carácter especial');
    if (username && password.toLowerCase().includes(username.toLowerCase())) {
        errors.push('No puede contener el nombre de usuario');
    }
    return { valid: errors.length === 0, errors: errors };
}

// Show password change modal
function showPasswordChangeModal() {
    document.getElementById('passwordChangeModal').style.display = 'block';
    document.getElementById('loginPage').style.display = 'none';
}

// Close password change modal
function closePasswordChangeModal() {
    document.getElementById('passwordChangeModal').style.display = 'none';
}

// Process password change
async function processPasswordChange() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!newPassword || !confirmPassword) {
        showAlert('Por favor complete ambos campos', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showAlert('Las contraseñas no coinciden', 'error');
        return;
    }
    
    // Validate password
    const validation = validateHIPAAPassword(newPassword, currentUser.username);
    if (!validation.valid) {
        showAlert('Contraseña no cumple requisitos:\\n' + validation.errors.join('\\n'), 'error');
        return;
    }
    
    // Call backend to change password
    const formData = new FormData();
    formData.append('action', 'change_password');
    formData.append('sessionId', sessionId);
    formData.append('newPassword', newPassword);
    
    try {
        const response = await fetch('/api/auth.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Contraseña cambiada exitosamente', 'success');
            closePasswordChangeModal();
            showDashboard();
        } else {
            showAlert(result.message || 'Error al cambiar contraseña', 'error');
        }
    } catch (error) {
        showAlert('Error de conexión. Intente nuevamente.', 'error');
    }
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showAlert('Por favor ingrese usuario y contraseña', 'error');
        return;
    }
    
    // Call backend API
    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('username', username);
    formData.append('password', password);
    
    try {
        const response = await fetch('/api/auth.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Store session
            sessionId = result.sessionId;
            currentUser = result.employee;
            
            // Check if password change required
            if (currentUser.requires_password_change) {
                showPasswordChangeModal();
            } else {
                showDashboard();
            }
        } else {
            showAlert(result.message || 'Error de autenticación', 'error');
        }
    } catch (error) {
        showAlert('Error de conexión. Verifique su red.', 'error');
        console.error('Login error:', error);
    }
});

// Show alert
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-' + type;
    alertDiv.textContent = message;
    alertDiv.style.cssText = 'position:fixed;top:20px;right:20px;padding:15px 25px;border-radius:8px;z-index:99999;max-width:400px;';
    
    if (type === 'success') {
        alertDiv.style.background = '#4CAF50';
        alertDiv.style.color = 'white';
    } else {
        alertDiv.style.background = '#f44336';
        alertDiv.style.color = 'white';
    }
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}
