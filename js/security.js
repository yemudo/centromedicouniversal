// Security Configuration Module for Centro Médico Universal
// Handles session timeout, password policies, and security enforcement

const securityConfig = {
    // Session configuration
    session: {
        inactivityTimeout: 15 * 60 * 1000, // 15 minutes in milliseconds
        warningTime: 13 * 60 * 1000, // Show warning 2 minutes before timeout
        checkInterval: 30 * 1000 // Check every 30 seconds
    },
    
    // Password policy
    passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        preventReuse: 5, // Can't reuse last 5 passwords
        expirationDays: 90,
        forceChangeOnFirstLogin: true
    }
}

// Make PasswordValidator available globally
window.PasswordValidator = {
    validate: function(password) {
        const errors = [];
        
        if (password.length < securityConfig.passwordPolicy.minLength) {
            errors.push(`La contraseña debe tener al menos ${securityConfig.passwordPolicy.minLength} caracteres`);
        }
        
        if (securityConfig.passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('La contraseña debe contener al menos una letra mayúscula');
        }
        
        if (securityConfig.passwordPolicy.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('La contraseña debe contener al menos una letra minúscula');
        }
        
        if (securityConfig.passwordPolicy.requireNumbers && !/\d/.test(password)) {
            errors.push('La contraseña debe contener al menos un número');
        }
        
        if (securityConfig.passwordPolicy.requireSpecialChars && 
            !new RegExp(`[${securityConfig.passwordPolicy.specialChars}]`).test(password)) {
            errors.push('La contraseña debe contener al menos un carácter especial');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    },
    
    getStrength: function(password) {
        let score = 0;
        let level = 'Muy débil';
        
        // Length points
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;
        
        // Complexity points
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*()_+-=\[\]{}|;:,.<>?]/.test(password)) score++;
        
        // Determine level
        if (score <= 2) level = 'Muy débil';
        else if (score <= 4) level = 'Débil';
        else if (score <= 5) level = 'Aceptable';
        else if (score <= 6) level = 'Fuerte';
        else level = 'Muy fuerte';
        
        return { score, level };
    }
};


// Session Manager Class
class SessionManager {
    constructor() {
        this.lastActivity = Date.now()
        this.warningShown = false
        this.sessionTimer = null
        this.initializeListeners()
    }
    
    initializeListeners() {
        // Track user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
        events.forEach(event => {
            document.addEventListener(event, () => this.updateActivity(), true)
        })
        
        // Start monitoring
        this.startMonitoring()
    }
    
    updateActivity() {
        this.lastActivity = Date.now()
        this.warningShown = false
        
        // Hide warning if shown
        const warning = document.getElementById('inactivity-warning')
        if (warning) {
            warning.style.display = 'none'
        }
    }
    
    startMonitoring() {
        this.sessionTimer = setInterval(() => {
            this.checkInactivity()
        }, securityConfig.session.checkInterval)
    }
    
    checkInactivity() {
        const now = Date.now()
        const timeSinceActivity = now - this.lastActivity
        
        // Check if should show warning
        if (timeSinceActivity >= securityConfig.session.warningTime && !this.warningShown) {
            this.showWarning()
            this.warningShown = true
        }
        
        // Check if should logout
        if (timeSinceActivity >= securityConfig.session.inactivityTimeout) {
            this.forceLogout()
        }
    }
    
    showWarning() {
        // Create warning modal if doesn't exist
        if (!document.getElementById('inactivity-warning')) {
            const warningHtml = `
                <div id="inactivity-warning" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #ff9800;
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    z-index: 10000;
                    max-width: 400px;
                ">
                    <h3 style="margin: 0 0 10px 0;">⚠️ Sesión por expirar</h3>
                    <p style="margin: 0 0 15px 0;">Su sesión expirará en 2 minutos por inactividad.</p>
                    <button onclick="sessionManager.extendSession()" style="
                        background: white;
                        color: #ff9800;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Continuar Trabajando</button>
                </div>
            `
            document.body.insertAdjacentHTML('beforeend', warningHtml)
        } else {
            document.getElementById('inactivity-warning').style.display = 'block'
        }
    }
    
    extendSession() {
        this.updateActivity()
        console.log('Session extended')
    }
    
    async forceLogout() {
        clearInterval(this.sessionTimer)
        
        // Show logout message
        const message = document.createElement('div')
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 10001;
                text-align: center;
            ">
                <h2>Sesión Expirada</h2>
                <p>Su sesión ha expirado por inactividad.</p>
                <p>Por favor, inicie sesión nuevamente.</p>
            </div>
        `
        document.body.appendChild(message)
        
        // Logout after 3 seconds
        setTimeout(async () => {
            if (window.supabase) {
                await window.supabase.auth.signOut()
            }
            window.location.href = 'login.html'
        }, 3000)
    }
}

// Password Validator Class
class PasswordValidator {
    static validate(password) {
        const policy = securityConfig.passwordPolicy
        const errors = []
        
        // Check length
        if (password.length < policy.minLength) {
            errors.push(`La contraseña debe tener al menos ${policy.minLength} caracteres`)
        }
        
        // Check uppercase
        if (policy.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Debe contener al menos una letra mayúscula')
        }
        
        // Check lowercase
        if (policy.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Debe contener al menos una letra minúscula')
        }
        
        // Check numbers
        if (policy.requireNumbers && !/\d/.test(password)) {
            errors.push('Debe contener al menos un número')
        }
        
        // Check special characters
        if (policy.requireSpecialChars) {
            const hasSpecial = policy.specialChars.split('').some(char => password.includes(char))
            if (!hasSpecial) {
                errors.push('Debe contener al menos un carácter especial (!@#$%^&*)')
            }
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        }
    }
    
    static getStrength(password) {
        let strength = 0
        
        if (password.length >= 8) strength++
        if (password.length >= 12) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[!@#$%^&*()_+-=\[\]{}|;:,.<>?]/.test(password)) strength++
        
        const levels = ['Muy débil', 'Débil', 'Regular', 'Buena', 'Fuerte', 'Muy fuerte']
        return {
            score: strength,
            level: levels[Math.min(strength - 1, levels.length - 1)],
            percentage: (strength / 6) * 100
        }
    }
}

// Export for use in other files
window.SessionManager = SessionManager
window.PasswordValidator = PasswordValidator
window.securityConfig = securityConfig

// Auto-initialize session manager on secure pages
if (window.location.pathname.includes('dashboard') || 
    window.location.pathname.includes('patients') ||
    window.location.pathname.includes('appointments') ||
    window.location.pathname.includes('schedule')) {
    window.sessionManager = new SessionManager()
}
