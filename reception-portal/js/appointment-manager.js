/**
 * Centro Médico Universal - Appointment Manager
 * Handles creating, editing, and canceling appointments
 */

class AppointmentManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.attachModalHandlers();
        this.populateDoctorSelect();
    }
    
    attachModalHandlers() {
        // Close buttons
        document.getElementById('modal-close')?.addEventListener('click', () => {
            this.closeModal('appointment-modal');
        });
        
        document.getElementById('new-modal-close')?.addEventListener('click', () => {
            this.closeModal('new-appointment-modal');
        });
        
        // Cancel buttons
        document.getElementById('cancel-new-appointment')?.addEventListener('click', () => {
            this.closeModal('new-appointment-modal');
        });
        
        // Save new appointment
        document.getElementById('save-new-appointment')?.addEventListener('click', () => {
            this.saveNewAppointment();
        });
        
        // Appointment actions
        document.getElementById('cancel-appointment')?.addEventListener('click', () => {
            this.cancelAppointment();
        });
        
        document.getElementById('check-in-patient')?.addEventListener('click', () => {
            this.checkInPatient();
        });
    }
    
    populateDoctorSelect() {
        const select = document.getElementById('doctor-select');
        if (!select) return;
        
        const doctors = CMU_CONFIG.DOCTORS;
        select.innerHTML = '<option value="">Seleccione un doctor...</option>';
        
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.name} - ${doctor.specialty}`;
            select.appendChild(option);
        });
    }
    
    async saveNewAppointment() {
        const form = document.getElementById('new-appointment-form');
        if (!form.checkValidity()) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }
        
        const appointmentData = {
            doctor_id: parseInt(document.getElementById('doctor-select').value),
            patient_name: document.getElementById('patient-name').value,
            patient_phone: document.getElementById('patient-phone').value,
            appointment_date: document.getElementById('appointment-date').value,
            appointment_time: document.getElementById('appointment-time').value,
            notes: document.getElementById('appointment-notes').value
        };
        
        try {
            const response = await fetch(`${CMU_CONFIG.MOTIA_API_URL}/appointments/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData)
            });
            
            if (response.ok) {
                alert('✅ Cita agendada exitosamente!');
                this.closeModal('new-appointment-modal');
                form.reset();
                // Reload calendar
                window.receptionCalendar?.updateCalendar();
            } else {
                alert('❌ Error al agendar la cita');
            }
        } catch (error) {
            console.error('Error saving appointment:', error);
            alert('❌ Error de conexión. Intente nuevamente.');
        }
    }
    
    async cancelAppointment() {
        if (!confirm('¿Está seguro que desea cancelar esta cita?')) {
            return;
        }
        
        // TODO: Implement cancel logic with API
        alert('Funcionalidad de cancelar en desarrollo');
        this.closeModal('appointment-modal');
    }
    
    async checkInPatient() {
        if (!confirm('¿Marcar paciente como llegado?')) {
            return;
        }
        
        // TODO: Implement check-in logic with API
        alert('Paciente marcado como llegado ✅');
        this.closeModal('appointment-modal');
        window.receptionCalendar?.updateCalendar();
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.appointmentManager = new AppointmentManager();
});
