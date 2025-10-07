// Centro Médico Universal - Booking System JavaScript

// Booking system state
let bookingData = {
    selectedDoctor: null,
    selectedDate: null,
    selectedTime: null,
    patientInfo: {}
};

// Doctor data with pricing
const doctors = [
    {
        id: 1,
        name: "Dr. Manuel Antonio Castillo Rodríguez",
        specialty: "Medicina Interna",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
        available: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        times: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
    },
    {
        id: 2,
        name: "Dra. Ana María Rodríguez",
        specialty: "Cardiología",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
        available: ["monday", "wednesday", "friday"],
        times: ["09:00", "10:00", "11:00", "14:00", "15:00"]
    },
    {
        id: 3,
        name: "Dr. Carlos Méndez",
        specialty: "Pediatría",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
        available: ["tuesday", "thursday", "saturday"],
        times: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingSystem();
});

function initializeBookingSystem() {
    loadDoctors();
    setupEventListeners();
    initializeCalendar();
}

function loadDoctors() {
    const doctorsList = document.getElementById('doctors-list');
    if (!doctorsList) return;

    doctorsList.innerHTML = '';
    
    doctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        doctorCard.innerHTML = `
            <div class="doctor-image">
                <img src="${doctor.image}" alt="${doctor.name}" onerror="this.src='https://via.placeholder.com/300x300/4a90e2/ffffff?text=Dr'">
            </div>
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p class="specialty">${doctor.specialty}</p>
                <div class="doctor-availability">
                    <i class="fas fa-clock"></i>
                    <span>Disponible ${doctor.available.length} días por semana</span>
                </div>
            </div>
            <button class="btn btn-primary select-doctor-btn" data-doctor-id="${doctor.id}">
                Seleccionar
            </button>
        `;
        
        doctorsList.appendChild(doctorCard);
    });

    // Add click listeners to doctor selection buttons
    document.querySelectorAll('.select-doctor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const doctorId = parseInt(this.getAttribute('data-doctor-id'));
            selectDoctor(doctorId);
        });
    });
}

function selectDoctor(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) return;

    bookingData.selectedDoctor = doctor;
    
    // Update UI
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    event.target.closest('.doctor-card').classList.add('selected');
    
    // Enable next button
    const nextBtn = document.getElementById('next-to-step-2');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function setupEventListeners() {
    // Step navigation
    const nextToStep2 = document.getElementById('next-to-step-2');
    if (nextToStep2) {
        nextToStep2.addEventListener('click', () => goToStep(2));
    }

    const nextToStep3 = document.getElementById('next-to-step-3');
    if (nextToStep3) {
        nextToStep3.addEventListener('click', () => goToStep(3));
    }

    const nextToStep4 = document.getElementById('next-to-step-4');
    if (nextToStep4) {
        nextToStep4.addEventListener('click', () => goToStep(4));
    }

    // Back buttons
    const backToStep1 = document.getElementById('back-to-step-1');
    if (backToStep1) {
        backToStep1.addEventListener('click', () => goToStep(1));
    }

    const backToStep2 = document.getElementById('back-to-step-2');
    if (backToStep2) {
        backToStep2.addEventListener('click', () => goToStep(2));
    }

    const backToStep3 = document.getElementById('back-to-step-3');
    if (backToStep3) {
        backToStep3.addEventListener('click', () => goToStep(3));
    }

    // Calendar navigation
    const prevMonth = document.getElementById('prev-month');
    if (prevMonth) {
        prevMonth.addEventListener('click', () => changeMonth(-1));
    }

    const nextMonth = document.getElementById('next-month');
    if (nextMonth) {
        nextMonth.addEventListener('click', () => changeMonth(1));
    }

    // Form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmission);
    }
}

let currentDate = new Date();

function initializeCalendar() {
    updateCalendar();
}

function updateCalendar() {
    const calendarTitle = document.getElementById('calendar-title');
    const calendarGrid = document.getElementById('calendar-grid');
    
    if (!calendarTitle || !calendarGrid) return;

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    calendarTitle.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Generate calendar days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    calendarGrid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Add calendar days
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = date.getDate();

        // Check if date is in current month
        if (date.getMonth() !== currentDate.getMonth()) {
            dayElement.classList.add('other-month');
        }

        // Check if date is in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) {
            dayElement.classList.add('past-date');
        } else {
            dayElement.addEventListener('click', () => selectDate(date));
        }

        calendarGrid.appendChild(dayElement);
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    updateCalendar();
}

function selectDate(date) {
    if (!bookingData.selectedDoctor) return;

    const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
    
    if (!bookingData.selectedDoctor.available.includes(dayName)) {
        alert('El doctor seleccionado no está disponible en esta fecha.');
        return;
    }

    bookingData.selectedDate = date;

    // Update UI
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    event.target.classList.add('selected');

    // Show available times
    showAvailableTimes();
    updateAppointmentSummary();
}

function showAvailableTimes() {
    const availableTimesContainer = document.getElementById('available-times');
    if (!availableTimesContainer || !bookingData.selectedDoctor) return;

    availableTimesContainer.innerHTML = '<h4>Horarios Disponibles</h4>';

    bookingData.selectedDoctor.times.forEach(time => {
        const timeButton = document.createElement('button');
        timeButton.className = 'time-slot';
        timeButton.textContent = time;
        timeButton.addEventListener('click', () => selectTime(time));
        availableTimesContainer.appendChild(timeButton);
    });
}

function selectTime(time) {
    bookingData.selectedTime = time;

    // Update UI
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    event.target.classList.add('selected');

    // Enable next button
    const nextBtn = document.getElementById('next-to-step-3');
    if (nextBtn) {
        nextBtn.disabled = false;
    }

    updateAppointmentSummary();
}

function updateAppointmentSummary() {
    const summaryContainer = document.getElementById('appointment-summary');
    const summaryDoctor = document.getElementById('summary-doctor');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summaryPrice = document.getElementById('summary-price');

    if (!summaryContainer) return;

    if (bookingData.selectedDoctor && bookingData.selectedDate && bookingData.selectedTime) {
        summaryContainer.style.display = 'block';
        
        if (summaryDoctor) {
            summaryDoctor.textContent = `${bookingData.selectedDoctor.name} - ${bookingData.selectedDoctor.specialty}`;
        }
        
        if (summaryDate) {
            summaryDate.textContent = bookingData.selectedDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        if (summaryTime) {
            summaryTime.textContent = bookingData.selectedTime;
        }
        
        if (summaryPrice) {
            summaryPrice.textContent = 'Consulta médica';
        }
    }
}

function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show target step
    const targetStep = document.getElementById(`step-${stepNumber}`);
    if (targetStep) {
        targetStep.classList.add('active');
    }

    // Update progress bar
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active', 'completed');
    });

    for (let i = 1; i <= stepNumber; i++) {
        const progressStep = document.querySelector(`[data-step="${i}"]`);
        if (progressStep) {
            if (i < stepNumber) {
                progressStep.classList.add('completed');
            } else if (i === stepNumber) {
                progressStep.classList.add('active');
            }
        }
    }

    // Special handling for step 3 (patient info)
    if (stepNumber === 3) {
        updateStep3Summary();
    }

    // Special handling for step 4 (confirmation)
    if (stepNumber === 4) {
        updateFinalConfirmation();
    }
}

function updateStep3Summary() {
    const step3Doctor = document.getElementById('step3-doctor');
    const step3DateTime = document.getElementById('step3-datetime');
    const step3Price = document.getElementById('step3-price');

    if (step3Doctor && bookingData.selectedDoctor) {
        step3Doctor.textContent = `${bookingData.selectedDoctor.name} - ${bookingData.selectedDoctor.specialty}`;
    }

    if (step3DateTime && bookingData.selectedDate && bookingData.selectedTime) {
        const dateStr = bookingData.selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        step3DateTime.textContent = `${dateStr} a las ${bookingData.selectedTime}`;
    }

    if (step3Price && bookingData.selectedDoctor) {
        step3Price.textContent = 'Consulta médica';
    }
}

function updateFinalConfirmation() {
    const confirmDoctor = document.getElementById('confirm-doctor');
    const confirmDateTime = document.getElementById('confirm-datetime');
    const confirmPrice = document.getElementById('confirm-price');
    const confirmPatient = document.getElementById('confirm-patient');

    if (confirmDoctor && bookingData.selectedDoctor) {
        confirmDoctor.textContent = `${bookingData.selectedDoctor.name} - ${bookingData.selectedDoctor.specialty}`;
    }

    if (confirmDateTime && bookingData.selectedDate && bookingData.selectedTime) {
        const dateStr = bookingData.selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        confirmDateTime.textContent = `${dateStr} a las ${bookingData.selectedTime}`;
    }

    if (confirmPrice && bookingData.selectedDoctor) {
        confirmPrice.textContent = 'Consulta médica';
    }

    // Get patient info from form
    const patientName = document.getElementById('patient-name')?.value || '';
    const patientEmail = document.getElementById('patient-email')?.value || '';
    const patientPhone = document.getElementById('patient-phone')?.value || '';

    if (confirmPatient) {
        confirmPatient.innerHTML = `
            <strong>${patientName}</strong><br>
            Email: ${patientEmail}<br>
            Teléfono: ${patientPhone}
        `;
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    // Collect patient information
    bookingData.patientInfo = {
        name: document.getElementById('patient-name')?.value || '',
        email: document.getElementById('patient-email')?.value || '',
        phone: document.getElementById('patient-phone')?.value || '',
        birthDate: document.getElementById('patient-birth-date')?.value || '',
        gender: document.getElementById('patient-gender')?.value || '',
        address: document.getElementById('patient-address')?.value || '',
        emergency_contact: document.getElementById('emergency-contact')?.value || '',
        emergency_phone: document.getElementById('emergency-phone')?.value || '',
        medical_history: document.getElementById('medical-history')?.value || '',
        current_medications: document.getElementById('current-medications')?.value || '',
        allergies: document.getElementById('allergies')?.value || '',
        reason: document.getElementById('appointment-reason')?.value || ''
    };

    // Simulate booking submission
    const submitBtn = document.getElementById('submit-booking');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        submitBtn.disabled = true;
    }

    // Simulate API call
    setTimeout(() => {
        // Show success message
        const successMessage = document.getElementById('booking-success');
        if (successMessage) {
            successMessage.style.display = 'block';
        }

        // Generate booking reference
        const bookingRef = 'CMU-' + Date.now().toString().slice(-6);
        const refElement = document.getElementById('booking-reference');
        if (refElement) {
            refElement.textContent = bookingRef;
        }

        // Hide form
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            bookingForm.style.display = 'none';
        }

        // Reset submit button
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Cita Confirmada';
            submitBtn.disabled = false;
        }

        // Send confirmation email (simulation)
        console.log('Booking confirmed:', bookingData);
        
    }, 2000);
}

// Utility functions
function formatDate(date) {
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function validateForm() {
    const requiredFields = [
        'patient-name',
        'patient-email',
        'patient-phone',
        'patient-birth-date'
    ];

    let isValid = true;
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else if (field) {
            field.classList.remove('error');
        }
    });

    return isValid;
}
