/**
 * Centro Médico Universal - Reception Calendar
 * Main calendar grid rendering and appointment display
 */

class ReceptionCalendar {
    constructor() {
        this.currentDate = new Date();
        this.viewMode = 'day'; // 'day', 'week', 'month'
        this.intervalMinutes = 15;
        this.appointments = [];
        
        // Working hours
        this.startHour = 7; // 7:00 AM
        this.endHour = 21;  // 9:00 PM
        
        this.init();
    }
    
    init() {
        this.attachEventListeners();
        this.updateDateDisplay();
        this.updateCalendar();
    }
    
    attachEventListeners() {
        // Date navigation
        document.getElementById('prev-date')?.addEventListener('click', () => {
            this.previousDate();
        });
        
        document.getElementById('next-date')?.addEventListener('click', () => {
            this.nextDate();
        });
        
        document.getElementById('today-btn')?.addEventListener('click', () => {
            this.goToToday();
        });
        
        // View mode selector
        document.getElementById('view-selector')?.addEventListener('change', (e) => {
            this.viewMode = e.target.value;
            this.updateCalendar();
        });
        
        // Interval selector
        document.getElementById('interval-selector')?.addEventListener('change', (e) => {
            this.intervalMinutes = parseInt(e.target.value);
            this.updateCalendar();
        });
        
        // Refresh button
        document.getElementById('refresh-btn')?.addEventListener('click', () => {
            this.loadAppointments();
        });
    }
    
    previousDate() {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.updateDateDisplay();
        this.updateCalendar();
    }
    
    nextDate() {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.updateDateDisplay();
        this.updateCalendar();
    }
    
    goToToday() {
        this.currentDate = new Date();
        this.updateDateDisplay();
        this.updateCalendar();
    }
    
    updateDateDisplay() {
        const dateElement = document.getElementById('current-date');
        if (!dateElement) return;
        
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        const dayName = days[this.currentDate.getDay()];
        const day = this.currentDate.getDate();
        const month = months[this.currentDate.getMonth()];
        const year = this.currentDate.getFullYear();
        
        dateElement.textContent = `${dayName}, ${day} de ${month} ${year}`;
    }
    
    updateCalendar() {
        this.renderCalendarHeader();
        this.renderCalendarGrid();
        this.loadAppointments();
    }
    
    renderCalendarHeader() {
        const headerContainer = document.getElementById('calendar-header');
        if (!headerContainer) return;
        
        // Get selected doctors from filter
        const selectedDoctors = window.doctorFilter?.getSelectedDoctors() || [];
        const selectedSpecialties = window.specialtyFilter?.getSelectedSpecialties() || [];
        
        // Filter doctors by selected specialties
        let doctorsToShow = selectedDoctors;
        if (selectedSpecialties.length > 0 && selectedSpecialties.length < CMU_CONFIG.getSpecialties().length) {
            doctorsToShow = selectedDoctors.filter(doctor => 
                selectedSpecialties.includes(doctor.specialty)
            );
        }
        
        // Add time column header
        let headerHtml = '<div class="time-column-header">Hora</div>';
        
        // Add doctor column headers
        doctorsToShow.forEach(doctor => {
            headerHtml += `
                <div class="doctor-column-header" data-doctor-id="${doctor.id}">
                    <div class="doctor-name">${doctor.name}</div>
                    <div class="doctor-specialty">${doctor.specialty}</div>
                </div>
            `;
        });
        
        headerContainer.innerHTML = headerHtml;
        
        // Store doctors for grid rendering
        this.displayedDoctors = doctorsToShow;
    }
    
    renderCalendarGrid() {
        const gridContainer = document.getElementById('calendar-grid');
        if (!gridContainer) return;
        
        const doctors = this.displayedDoctors || [];
        if (doctors.length === 0) {
            gridContainer.innerHTML = '<div class="no-doctors">No hay doctores seleccionados</div>';
            return;
        }
        
        let gridHtml = '';
        
        // Generate time slots
        const totalSlots = ((this.endHour - this.startHour) * 60) / this.intervalMinutes;
        
        for (let i = 0; i < totalSlots; i++) {
            const minutes = this.startHour * 60 + (i * this.intervalMinutes);
            const hour = Math.floor(minutes / 60);
            const minute = minutes % 60;
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            
            // Create row for this time slot
            gridHtml += `<div class="calendar-row" data-time="${timeString}">`;
            
            // Time label column
            gridHtml += `
                <div class="time-label">
                    ${this.formatTime(hour, minute)}
                </div>
            `;
            
            // Doctor columns (appointment slots)
            doctors.forEach(doctor => {
                gridHtml += `
                    <div class="appointment-slot" 
                         data-doctor-id="${doctor.id}"
                         data-time="${timeString}"
                         data-date="${this.formatDate(this.currentDate)}">
                        <!-- Appointments will be placed here -->
                    </div>
                `;
            });
            
            gridHtml += `</div>`;
        }
        
        gridContainer.innerHTML = gridHtml;
        
        // Attach click handlers for empty slots
        this.attachSlotClickHandlers();
    }
    
    attachSlotClickHandlers() {
        const slots = document.querySelectorAll('.appointment-slot');
        slots.forEach(slot => {
            slot.addEventListener('click', (e) => {
                // If clicking empty slot, open new appointment modal
                if (!e.target.closest('.appointment-card')) {
                    const doctorId = parseInt(slot.dataset.doctorId);
                    const time = slot.dataset.time;
                    const date = slot.dataset.date;
                    this.openNewAppointmentModal(doctorId, date, time);
                }
            });
        });
    }
    
    formatTime(hour, minute) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    }
    
    formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    async loadAppointments() {
        // Show loading
        const loading = document.getElementById('loading-overlay');
        if (loading) loading.style.display = 'flex';
        
        try {
            // Format date for API
            const dateString = this.formatDate(this.currentDate);
            
            // Get doctor IDs to load
            const doctorIds = this.displayedDoctors.map(d => d.id).join(',');
            
            // Call API to get appointments
            const response = await fetch(
                `${CMU_CONFIG.MOTIA_API_URL}/appointments?date=${dateString}&doctors=${doctorIds}`
            );
            
            if (response.ok) {
                this.appointments = await response.json();
                this.renderAppointments();
            }
        } catch (error) {
            console.error('Error loading appointments:', error);
            // Use mock data for now
            this.appointments = this.getMockAppointments();
            this.renderAppointments();
        } finally {
            if (loading) loading.style.display = 'none';
        }
    }
    
    renderAppointments() {
        // Clear existing appointments from grid
        const slots = document.querySelectorAll('.appointment-slot');
        slots.forEach(slot => slot.innerHTML = '');
        
        // Place each appointment in the correct slot
        this.appointments.forEach(apt => {
            const slot = document.querySelector(
                `.appointment-slot[data-doctor-id="${apt.doctor_id}"][data-time="${apt.time}"][data-date="${apt.date}"]`
            );
            
            if (slot) {
                const appointmentHtml = `
                    <div class="appointment-card ${this.getAppointmentColorClass(apt)}" 
                         data-appointment-id="${apt.id}"
                         onclick="window.receptionCalendar.openAppointmentModal(${apt.id})">
                        <div class="apt-patient-name">${apt.patient_name}</div>
                        <div class="apt-phone">${apt.patient_phone}</div>
                        ${apt.notes ? `<div class="apt-notes">${apt.notes.substring(0, 30)}...</div>` : ''}
                    </div>
                `;
                slot.innerHTML = appointmentHtml;
            }
        });
    }
    
    getAppointmentColorClass(apt) {
        // Color code by status
        if (apt.status === 'confirmed') return 'apt-blue';
        if (apt.status === 'pending') return 'apt-yellow';
        if (apt.status === 'checked-in') return 'apt-green';
        if (apt.status === 'cancelled') return 'apt-red';
        return 'apt-cyan';
    }
    
    getMockAppointments() {
        // Mock data for testing
        return [
            {
                id: 1,
                doctor_id: 93,
                patient_name: 'Juan Pérez',
                patient_phone: '809-555-1234',
                date: this.formatDate(this.currentDate),
                time: '08:30',
                status: 'confirmed',
                notes: 'Control mensual'
            }
        ];
    }
    
    openAppointmentModal(appointmentId) {
        const apt = this.appointments.find(a => a.id === appointmentId);
        if (!apt) return;
        
        const modal = document.getElementById('appointment-modal');
        const modalBody = document.getElementById('modal-body');
        
        if (modal && modalBody) {
            modalBody.innerHTML = `
                <p><strong>Paciente:</strong> ${apt.patient_name}</p>
                <p><strong>Teléfono:</strong> ${apt.patient_phone}</p>
                <p><strong>Fecha:</strong> ${apt.date}</p>
                <p><strong>Hora:</strong> ${apt.time}</p>
                <p><strong>Doctor:</strong> ${this.getDoctorName(apt.doctor_id)}</p>
                ${apt.notes ? `<p><strong>Notas:</strong> ${apt.notes}</p>` : ''}
                <p><strong>Estado:</strong> <span class="status-badge ${apt.status}">${apt.status}</span></p>
            `;
            modal.style.display = 'flex';
        }
    }
    
    openNewAppointmentModal(doctorId, date, time) {
        const modal = document.getElementById('new-appointment-modal');
        if (!modal) return;
        
        // Pre-fill form
        document.getElementById('doctor-select').value = doctorId;
        document.getElementById('appointment-date').value = date;
        document.getElementById('appointment-time').value = time;
        
        modal.style.display = 'flex';
    }
    
    getDoctorName(doctorId) {
        const doctor = CMU_CONFIG.DOCTORS.find(d => d.id === doctorId);
        return doctor ? doctor.name : 'Desconocido';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.receptionCalendar = new ReceptionCalendar();
});
