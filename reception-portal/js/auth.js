/**
 * Centro Médico Universal - Simple Authentication
 * Basic login check for reception portal
 */

class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.checkLogin();
        this.attachLogoutHandler();
    }
    
    checkLogin() {
        // Check if user is logged in (simple localStorage check for now)
        const user = localStorage.getItem('cmu_user');
        
        if (user) {
            this.currentUser = JSON.parse(user);
            this.displayUserInfo();
        } else {
            // For now, auto-login as reception
            this.autoLogin();
        }
    }
    
    autoLogin() {
        // Temporary auto-login for testing
        const defaultUser = {
            username: 'recepcion',
            fullName: 'Recepción CMU',
            role: 'recepcionista',
            permissions: ['view_calendar', 'schedule_appointments', 'check_in_patients']
        };
        
        localStorage.setItem('cmu_user', JSON.stringify(defaultUser));
        this.currentUser = defaultUser;
        this.displayUserInfo();
    }
    
    displayUserInfo() {
        const userElement = document.getElementById('current-user');
        if (userElement && this.currentUser) {
            userElement.textContent = this.currentUser.fullName;
        }
    }
    
    attachLogoutHandler() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
    }
    
    logout() {
        if (confirm('¿Cerrar sesión?')) {
            localStorage.removeItem('cmu_user');
            window.location.reload();
        }
    }
    
    hasPermission(permission) {
        if (!this.currentUser) return false;
        return this.currentUser.permissions.includes(permission);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new Auth();
});
