// NIVIN EMR - User Management System
// Centro Médico Universal
// Super Admin: mcastillo

const API_URL = '/api';

// Users data (will be loaded from database)
let allUsers = [];
let currentUser = null;

// Role definitions with permissions
const ROLES = {
    super_admin: {
        label: 'Super Administrador',
        permissions: ['*'] // All permissions
    },
    admin: {
        label: 'Administrador',
        permissions: ['manage_users', 'view_reports', 'manage_schedule', 'manage_patients', 'view_billing']
    },
    doctor: {
        label: 'Doctor/Provider',
        permissions: ['view_patients', 'manage_appointments', 'write_notes', 'prescribe', 'view_labs']
    },
    nurse: {
        label: 'Enfermera',
        permissions: ['view_patients', 'update_vitals', 'view_appointments', 'manage_tasks']
    },
    receptionist: {
        label: 'Recepcionista',
        permissions: ['manage_schedule', 'check_in_patients', 'view_appointments', 'manage_calls']
    },
    billing: {
        label: 'Facturación',
        permissions: ['view_billing', 'process_payments', 'generate_invoices', 'view_reports']
    }
};

// All available permissions
const ALL_PERMISSIONS = [
    { id: 'manage_users', label: 'Gestionar Usuarios' },
    { id: 'view_reports', label: 'Ver Reportes' },
    { id: 'manage_schedule', label: 'Gestionar Horarios' },
    { id: 'manage_patients', label: 'Gestionar Pacientes' },
    { id: 'view_patients', label: 'Ver Pacientes' },
    { id: 'manage_appointments', label: 'Gestionar Citas' },
    { id: 'view_appointments', label: 'Ver Citas' },
    { id: 'check_in_patients', label: 'Check-in Pacientes' },
    { id: 'write_notes', label: 'Escribir Notas Clínicas' },
    { id: 'prescribe', label: 'Prescribir Medicamentos' },
    { id: 'view_labs', label: 'Ver Laboratorios' },
    { id: 'update_vitals', label: 'Actualizar Signos Vitales' },
    { id: 'manage_tasks', label: 'Gestionar Tareas' },
    { id: 'view_billing', label: 'Ver Facturación' },
    { id: 'process_payments', label: 'Procesar Pagos' },
    { id: 'generate_invoices', label: 'Generar Facturas' },
    { id: 'manage_calls', label: 'Gestionar Llamadas' }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUsers();
    
    // Set up form handler
    document.getElementById('userForm').addEventListener('submit', handleUserSubmit);
    
    // Load permissions when role changes
    document.getElementById('role').addEventListener('change', function() {
        loadPermissionsForRole(this.value);
    });
});

// Check authentication
async function checkAuth() {
    try {
        const response = await fetch(`${API_URL}/oracle-auth.php`);
        const data = await response.json();
        
        if (!data.success || data.data.role !== 'super_admin') {
            window.location.href = 'login-oracle.html';
        }
        
        currentUser = data.data;
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = 'login-oracle.html';
    }
}

// Load all users
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/user-management-api.php`);
        const data = await response.json();
        
        if (data.success) {
            allUsers = data.users || [];
            renderUsers(allUsers);
            updateStats();
        } else {
            showAlert('Error al cargar usuarios: ' + data.error, 'error');
        }
    } catch (error) {
        console.error('Error loading users:', error);
        
        // Show default super admin if API fails
        allUsers = [{
            id: 1,
            username: 'mcastillo',
            full_name: 'Manuel Castillo',
            email: 'nuelcastillo@centromedicouniversal.com',
            role: 'super_admin',
            is_active: 1,
            created_at: new Date().toISOString()
        }];
        renderUsers(allUsers);
        updateStats();
    }
}

// Render users table
function renderUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (users.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td><strong>${user.username}</strong></td>
            <td>${user.full_name}</td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role}">${ROLES[user.role]?.label || user.role}</span></td>
            <td><span class="status-badge status-${user.is_active ? 'active' : 'inactive'}">${user.is_active ? 'Activo' : 'Inactivo'}</span></td>
            <td class="actions">
                ${user.role !== 'super_admin' ? `
                    <button class="btn btn-primary btn-small" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : '<span style="color: #7f8c8d;">Protected</span>'}
            </td>
        </tr>
    `).join('');
}

// Update statistics
function updateStats() {
    document.getElementById('totalUsers').textContent = allUsers.length;
    document.getElementById('activeUsers').textContent = allUsers.filter(u => u.is_active).length;
    document.getElementById('doctorCount').textContent = allUsers.filter(u => u.role === 'doctor').length;
    document.getElementById('adminCount').textContent = allUsers.filter(u => u.role === 'super_admin' || u.role === 'admin').length;
}

// Filter users
function filterUsers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;
    
    let filtered = allUsers;
    
    if (searchTerm) {
        filtered = filtered.filter(user => 
            user.username.toLowerCase().includes(searchTerm) ||
            user.full_name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    }
    
    if (roleFilter) {
        filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    renderUsers(filtered);
}

// Open add user modal
function openAddUserModal() {
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-user-plus"></i> Agregar Usuario';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('password').required = true;
    document.getElementById('isActive').checked = true;
    document.getElementById('userModal').classList.add('active');
}

// Close user modal
function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
}

// Edit user
async function editUser(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-user-edit"></i> Editar Usuario';
    document.getElementById('userId').value = user.id;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('fullName').value = user.full_name;
    document.getElementById('role').value = user.role;
    document.getElementById('isActive').checked = user.is_active;
    document.getElementById('password').required = false;
    document.getElementById('password').placeholder = 'Dejar en blanco para mantener actual';
    
    loadPermissionsForRole(user.role);
    
    document.getElementById('userModal').classList.add('active');
}

// Delete user
async function deleteUser(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    if (!confirm(`¿Está seguro que desea eliminar al usuario "${user.full_name}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/user-management-api.php`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Usuario eliminado exitosamente', 'success');
            loadUsers();
        } else {
            showAlert('Error al eliminar usuario: ' + data.error, 'error');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        showAlert('Error al eliminar usuario', 'error');
    }
}

// Handle form submission
async function handleUserSubmit(e) {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const formData = {
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        full_name: document.getElementById('fullName').value.trim(),
        role: document.getElementById('role').value,
        is_active: document.getElementById('isActive').checked ? 1 : 0
    };
    
    // Add password if provided
    const password = document.getElementById('password').value;
    if (password) {
        if (password.length < 8) {
            showAlert('La contraseña debe tener al menos 8 caracteres', 'error');
            return;
        }
        formData.password = password;
    }
    
    // Get selected permissions
    const permCheckboxes = document.querySelectorAll('#permissionsGrid input[type="checkbox"]:checked');
    formData.permissions = Array.from(permCheckboxes).map(cb => cb.value);
    
    try {
        const url = `${API_URL}/user-management-api.php`;
        const method = userId ? 'PUT' : 'POST';
        
        if (userId) {
            formData.id = parseInt(userId);
        }
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert(userId ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente', 'success');
            closeUserModal();
            loadUsers();
        } else {
            showAlert('Error: ' + data.error, 'error');
        }
    } catch (error) {
        console.error('Error saving user:', error);
        showAlert('Error al guardar usuario', 'error');
    }
}

// Load permissions for role
function loadPermissionsForRole(role) {
    const permissionsGrid = document.getElementById('permissionsGrid');
    const rolePerms = ROLES[role]?.permissions || [];
    
    permissionsGrid.innerHTML = ALL_PERMISSIONS.map(perm => {
        const checked = rolePerms.includes('*') || rolePerms.includes(perm.id);
        return `
            <div class="permission-item">
                <input 
                    type="checkbox" 
                    id="perm_${perm.id}" 
                    value="${perm.id}"
                    ${checked ? 'checked' : ''}
                >
                <label for="perm_${perm.id}">${perm.label}</label>
            </div>
        `;
    }).join('');
}

// Show alert
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} active`;
    
    setTimeout(() => {
        alertBox.classList.remove('active');
    }, 5000);
}

// Logout
async function logout() {
    try {
        await fetch(`${API_URL}/oracle-auth.php`, { method: 'DELETE' });
    } catch (error) {
        console.error('Logout error:', error);
    }
    window.location.href = 'login-oracle.html';
}
