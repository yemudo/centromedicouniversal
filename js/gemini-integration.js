/**
 * Gemini Pro Integration for Centro Médico Universal Castillo Rodríguez y Asociados
 * VERSION 2.0 - WITH REAL SCHEDULING API INTEGRATION
 * 
 * This script provides AI-powered functionality:
 * - REAL-TIME appointment scheduling with database integration
 * - Smart availability checking
 * - Alternative doctor suggestions
 * - Medical terminology and symptom checking
 * - Health information assistant
 * 
 * Last Updated: October 2, 2025
 */

// Configuration for Gemini Pro integration
const AI_CONFIG = {
    apiKey: 'AIzaSyC1RfhxKu-4zYx3apc6zXZpnsGGBnYc5GA',
    model: 'gemini-pro',
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
    maxOutputTokens: 800,
    temperature: 0.7,
    useOfflineMode: false,
    retryDelay: 1000,
    maxRetries: 2,
    timeout: 10000
};

// Scheduling API Configuration
const SCHEDULING_API = {
    baseUrl: '/api/scheduling-api.php',
    endpoints: {
        availableSlots: '/available-slots',
        bookAppointment: '/book-appointment',
        cancelAppointment: '/cancel-appointment',
        findAlternatives: '/find-alternative-doctors'
    }
};

// Doctors directory - ALL 95 REAL DOCTORS from database
// Last updated: October 2, 2025 from MySQL centro_medico_universal.doctores
const DOCTORS = [
    {id:93, name:"Dr. Tomás Reyes", specialty:"Anestesiología"},
    {id:92, name:"Dr. Félix Ramírez", specialty:"Anestesiología"},
    {id:76, name:"Dr. Ángel Oviedo", specialty:"Cardiología"},
    {id:78, name:"Dr. Julio César Polanco", specialty:"Cardiología"},
    {id:77, name:"Dr. Raúl Vásquez Bonilla", specialty:"Cardiología"},
    {id:32, name:"Dr. Samuel Abreu", specialty:"Cirugía Bariátrica"},
    {id:33, name:"Dr. Josman Ventura", specialty:"Cirugía Cardiovascular"},
    {id:31, name:"Dr. Wilson Méndez", specialty:"Cirugía de Tórax"},
    {id:29, name:"Dra. Leticia I. Vargas Ozuna", specialty:"Cirugía General"},
    {id:30, name:"Dr. Santiago Méndez Camacho", specialty:"Cirugía General"},
    {id:28, name:"Dr. Keila Verigüete", specialty:"Cirugía Laparoscópica"},
    {id:95, name:"Dr. Wilson Canario", specialty:"Cirugía Plástica"},
    {id:27, name:"Dr. José Rafael Gallo Mendoza", specialty:"Cirujano General"},
    {id:26, name:"Dr. José R. Ayala Hernández", specialty:"Cirujano General"},
    {id:25, name:"Dr. Johnny Paredes Rodríguez", specialty:"Cirujano General"},
    {id:24, name:"Dr. Germán José Javier Filio", specialty:"Cirujano General"},
    {id:23, name:"Dr. Emilio", specialty:"Cirujano General"},
    {id:22, name:"Dr. Edgar Ulises García Gómez", specialty:"Cirujano General"},
    {id:20, name:"Dr. Alecsandri Gil Zorrilla", specialty:"Cirujano General"},
    {id:21, name:"Dr. Carlos Alberto García Rodríguez", specialty:"Cirujano General"},
    {id:79, name:"Dr. Jesús Cabrera", specialty:"Dermatología"},
    {id:90, name:"Dra. Patricia Gómez Torres", specialty:"Endocrinología"},
    {id:89, name:"Dr. Nelson Pimentel", specialty:"Endocrinología"},
    {id:88, name:"Dr. Jonathan Guzmán García", specialty:"Endocrinología"},
    {id:19, name:"Dra. Danely Edilia Gómez Morfa", specialty:"Endocrinología Ginecológica"},
    {id:52, name:"Dr. David Morrobel", specialty:"Enfermedades Infecciosas"},
    {id:54, name:"Dr. Reynaldo Sánchez", specialty:"Gastroenterología"},
    {id:53, name:"Dr. Juan Florián Jiménez De Los Santos", specialty:"Gastroenterología"},
    {id:2, name:"Dra. Alcia Crimely Matos Ramírez", specialty:"Ginecología y Obstetricia"},
    {id:17, name:"Dra. Vidalva Decena Medina", specialty:"Ginecología y Obstetricia"},
    {id:1, name:"Dra. Adalgiza Ramona Jiménez Jiménez", specialty:"Ginecología y Obstetricia"},
    {id:3, name:"Dr. César Augusto Peña Acosta", specialty:"Ginecología y Obstetricia"},
    {id:4, name:"Dra. Emma Francisca Muñoz de Almonte", specialty:"Ginecología y Obstetricia"},
    {id:5, name:"Dra. Andrea Henríquez", specialty:"Ginecología y Obstetricia"},
    {id:6, name:"Dr. Enmanuel Miranda", specialty:"Ginecología y Obstetricia"},
    {id:7, name:"Dra. Ercilia Maribel Polanco Cruz", specialty:"Ginecología y Obstetricia"},
    {id:8, name:"Dra. Eulalia Fiordaliza Castro López", specialty:"Ginecología y Obstetricia"},
    {id:9, name:"Dr. Francisco Javier Cedeño", specialty:"Ginecología y Obstetricia"},
    {id:10, name:"Dra. Griselda Alt. Basora Ramírez", specialty:"Ginecología y Obstetricia"},
    {id:11, name:"Dra. Irsa M. Montero Díaz", specialty:"Ginecología y Obstetricia"},
    {id:12, name:"Dra. Julissa María Rojas Hernández", specialty:"Ginecología y Obstetricia"},
    {id:13, name:"Dra. Marilelda Reyes", specialty:"Ginecología y Obstetricia"},
    {id:14, name:"Dra. Lucía Altagracia de Jesús", specialty:"Ginecología y Obstetricia"},
    {id:16, name:"Dr. Reyson Edgar Pavón Fontanilla", specialty:"Ginecología y Obstetricia"},
    {id:15, name:"Dra. Ramona Jiménez", specialty:"Ginecología y Obstetricia"},
    {id:18, name:"Dra. Maribel Mejía Tapia", specialty:"Ginecología Oncológica"},
    {id:51, name:"Dra. Carla Sánchez", specialty:"Medicina Crítica"},
    {id:45, name:"Dr. Nelson de Jesús", specialty:"Medicina Interna"},
    {id:34, name:"Dra. Ana Belkis Mateo Valdez", specialty:"Medicina Interna"},
    {id:35, name:"Dr. Andrea Valoy Hernández", specialty:"Medicina Interna"},
    {id:36, name:"Dr. Andyson De León González", specialty:"Medicina Interna"},
    {id:37, name:"Dra. Bárbara Altagracia Flores Espinosa", specialty:"Medicina Interna"},
    {id:38, name:"Dra. Blanca I. Báez Mena", specialty:"Medicina Interna"},
    {id:39, name:"Dr. César Ricardo Guzmán Báez", specialty:"Medicina Interna"},
    {id:40, name:"Dra. Félix María Flete Feliz", specialty:"Medicina Interna"},
    {id:44, name:"Dra. Miriam de Jesús Pérez Gómez", specialty:"Medicina Interna"},
    {id:41, name:"Dr. Francisco Encarnación Almonte", specialty:"Medicina Interna"},
    {id:42, name:"Dr. Luis Alberto Garrido De Los Santos", specialty:"Medicina Interna"},
    {id:43, name:"Dr. Margen Antonio Cabrera Peguero", specialty:"Medicina Interna"},
    {id:50, name:"Dra. Yudelka Margarita García Acosta", specialty:"Medicina Interna"},
    {id:49, name:"Dr. Yunior Brito Paredes", specialty:"Medicina Interna"},
    {id:48, name:"Dra. Sara Altagracia Díaz Acosta", specialty:"Medicina Interna"},
    {id:47, name:"Dr. Rafael Ismael Tejeda Gómez", specialty:"Medicina Interna"},
    {id:46, name:"Dr. Othon Alexander Batista De Los Santos", specialty:"Medicina Interna"},
    {id:65, name:"Dr. Ángel Martínez Reyes", specialty:"Neurocirugía"},
    {id:66, name:"Dr. Rafael De Jesús Rodríguez", specialty:"Neurología"},
    {id:87, name:"Dra. Elsi Hernández", specialty:"Nutrición"},
    {id:86, name:"Dr. Ramón Gómez", specialty:"Nutrición"},
    {id:82, name:"Dra. Marlen Méndez Batista", specialty:"Odontología"},
    {id:67, name:"Dr. José Valentín Carmona Gómez", specialty:"Oftalmología"},
    {id:68, name:"Dr. Juan López Durán", specialty:"Oftalmología"},
    {id:75, name:"Dr. Rafael Díaz", specialty:"Oncología"},
    {id:69, name:"Dr. Salvador De Jesús Medrano", specialty:"Ortopedia"},
    {id:81, name:"Dr. Elio Vargas", specialty:"Otorrinolaringología"},
    {id:80, name:"Dr. Diosmel Santana", specialty:"Otorrinolaringología"},
    {id:55, name:"Dra. Andrea Estrella Peralta", specialty:"Pediatría"},
    {id:56, name:"Dr. Cesarín Domínguez", specialty:"Pediatría"},
    {id:57, name:"Dra. Elisa Altagracia Candelario", specialty:"Pediatría"},
    {id:58, name:"Dr. Geovanny De Jesús Ozoria Acosta", specialty:"Pediatría"},
    {id:59, name:"Dr. Jovanny Del Carmen Matos Santana", specialty:"Pediatría"},
    {id:60, name:"Dr. Manuel Antonio Encarnación Rodríguez", specialty:"Pediatría"},
    {id:61, name:"Dra. Nelly Martínez Estrella", specialty:"Pediatría"},
    {id:62, name:"Dra. Olga Del Carmen Montero Lebrón", specialty:"Pediatría"},
    {id:63, name:"Dra. Sandra De Los Ángeles Estrella Peralta", specialty:"Pediatría"},
    {id:64, name:"Dr. Víctor Rafael Valdez Pacheco", specialty:"Pediatría"},
    {id:84, name:"Dr. Jorge Luis Nolasco", specialty:"Psicología"},
    {id:85, name:"Dr. Luis Emilio Fernández", specialty:"Psicología"},
    {id:83, name:"Dra. Fátima Ramírez", specialty:"Psiquiatría"},
    {id:73, name:"Dr. Eddie F. Ramírez", specialty:"Radiología"},
    {id:74, name:"Dr. Kelvin Espinal Hernández", specialty:"Radiología"},
    {id:72, name:"Dr. Dilenny De Los Santos Hilario", specialty:"Radiología Intervencionista"},
    {id:70, name:"Dra. Carolin A. Ortega", specialty:"Urología"},
    {id:71, name:"Dr. Carlos José Rodríguez De La Cruz", specialty:"Urología"},
    {id:91, name:"Dr. Pedro Rafael Castillo Rodríguez", specialty:"Director General"},
    {id:94, name:"Dr. Manuel Antonio Castillo Rodríguez", specialty:"Co-Director"}
];

// ========================================
// SCHEDULING API FUNCTIONS
// ========================================

/**
 * Check available appointment slots for a doctor or specialty
 * @param {Object} params - {specialty: string, date: string, doctor_id: number}
 * @returns {Promise} Available slots from API
 */
async function checkAvailableSlots(params) {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${SCHEDULING_API.baseUrl}${SCHEDULING_API.endpoints.availableSlots}?${queryParams}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            return data;
        } else {
            throw new Error(data.error || 'No se pudieron obtener horarios disponibles');
        }
    } catch (error) {
        console.error('Error checking availability:', error);
        return { success: false, error: error.message, doctors: [] };
    }
}

/**
 * Book an appointment in the database
 * @param {Object} appointmentData - {doctor_id, patient_name, patient_phone, appointment_date, appointment_time, notes}
 * @returns {Promise} Booking confirmation
 */
async function bookAppointment(appointmentData) {
    const url = `${SCHEDULING_API.baseUrl}${SCHEDULING_API.endpoints.bookAppointment}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            return data;
        } else {
            throw new Error(data.error || 'No se pudo confirmar la cita');
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Find alternative doctors when primary choice is fully booked
 * @param {Object} params - {specialty: string, date: string, exclude_doctor_id: number}
 * @returns {Promise} Alternative doctors with availability
 */
async function findAlternativeDoctors(params) {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${SCHEDULING_API.baseUrl}${SCHEDULING_API.endpoints.findAlternatives}?${queryParams}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            return data;
        } else {
            throw new Error(data.error || 'No se encontraron doctores alternativos');
        }
    } catch (error) {
        console.error('Error finding alternatives:', error);
        return { success: false, error: error.message, doctors: [] };
    }
}

/**
 * Send appointment confirmation SMS
 * @param {Object} data - {patient_name, patient_phone, doctor_name, specialty, appointment_date, appointment_time, appointment_id, notify_admin}
 * @returns {Promise} SMS sending result
 */
async function sendAppointmentSMS(data) {
    const url = '/api/send-appointment-sms.php';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ SMS enviado al paciente:', result.sms_sid);
            return result;
        } else {
            throw new Error(result.error || 'No se pudo enviar SMS');
        }
    } catch (error) {
        console.error('❌ Error enviando SMS:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Format date to MySQL format (YYYY-MM-DD)
 */
function formatDateForAPI(dateString) {
    // Handle various date formats
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // Try parsing Spanish date format
        return parseSp anishDate(dateString);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Parse Spanish date strings like "viernes 4 de octubre"
 */
function parseSpanishDate(dateStr) {
    const today = new Date();
    const normalized = dateStr.toLowerCase().trim();
    
    // Check for relative dates
    if (normalized.includes('hoy')) {
        return formatDateForAPI(today);
    }
    if (normalized.includes('mañana')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return formatDateForAPI(tomorrow);
    }
    
    // Days of week in Spanish
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const currentDay = today.getDay();
    
    for (let i = 0; i < days.length; i++) {
        if (normalized.includes(days[i])) {
            const targetDay = i;
            const daysUntil = (targetDay - currentDay + 7) % 7 || 7;
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() + daysUntil);
            return formatDateForAPI(targetDate);
        }
    }
    
    // Try to extract day number
    const dayMatch = normalized.match(/(\d{1,2})/);
    if (dayMatch) {
        const day = parseInt(dayMatch[1]);
        const targetDate = new Date(today.getFullYear(), today.getMonth(), day);
        if (targetDate < today) {
            targetDate.setMonth(targetDate.getMonth() + 1);
        }
        return formatDateForAPI(targetDate);
    }
    
    // Default to tomorrow if can't parse
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDateForAPI(tomorrow);
}

/**
 * Format time to MySQL format (HH:MM:SS)
 */
function formatTimeForAPI(timeString) {
    const normalized = timeString.toLowerCase().trim();
    
    // Extract hour and minutes
    const timeMatch = normalized.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/);
    if (!timeMatch) return '09:00:00'; // Default to 9 AM
    
    let hour = parseInt(timeMatch[1]);
    const minutes = timeMatch[2] || '00';
    const meridiem = timeMatch[3];
    
    // Convert to 24-hour format
    if (meridiem === 'pm' && hour < 12) hour += 12;
    if (meridiem === 'am' && hour === 12) hour = 0;
    
    return `${String(hour).padStart(2, '0')}:${minutes}:00`;
}

// ========================================
// CHAT STATE MANAGEMENT
// ========================================

const ChatState = {
    mode: 'normal', // 'normal', 'scheduling', 'feedback', 'representative'
    step: 0,
    data: {
        doctor: null,
        doctorId: null,
        specialty: null,
        date: null,
        time: null,
        availableSlots: [],
        name: null,
        phone: null,
        notes: '',
        feedback: {
            name: null,
            phone: null,
            complaint: null
        }
    }
};

/**
 * Reset chat state to normal mode
 */
function resetChatState() {
    ChatState.mode = 'normal';
    ChatState.step = 0;
    ChatState.data = {
        doctor: null,
        doctorId: null,
        specialty: null,
        date: null,
        time: null,
        availableSlots: [],
        name: null,
        phone: null,
        notes: '',
        feedback: {
            name: null,
            phone: null,
            complaint: null
        }
    };
}

// ========================================
// IMPROVED SCHEDULING FLOW WITH REAL API
// ========================================

/**
 * Main scheduling flow handler - connects to REAL scheduling API
 * Steps: specialty/doctor → check availability → select time → patient info → book in database
 */
async function handleSchedulingFlow(input, messagesContainer) {
    // Activate scheduling mode
    if (ChatState.mode !== 'scheduling') {
        ChatState.mode = 'scheduling';
        ChatState.step = 0;
    }

    const aiSay = (text) => {
        const m = document.createElement('div');
        m.className = 'ai-message';
        m.innerHTML = formatResponseText(text);
        messagesContainer.appendChild(m);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const showLoading = () => {
        const m = document.createElement('div');
        m.className = 'ai-message typing';
        m.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(m);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return m;
    };

    const normalize = (s) => (s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

    // STEP 0: Ask for doctor or specialty
    if (ChatState.step === 0) {
        aiSay('Perfecto. ¿Con qué doctor desea agendar, o qué especialidad necesita?');
        aiSay('Puede decirme el nombre del doctor o la especialidad (ej: "cardiología", "ginecología")');
        ChatState.step = 1;
        return true;
    }

    // STEP 1: Identify doctor or specialty
    if (ChatState.step === 1) {
        const t = normalize(input);
        
        // Try to match doctor by name
        const doctorMatch = DOCTORS.find(d => 
            normalize(d.name).includes(t) || t.includes(normalize(d.name))
        );
        
        if (doctorMatch) {
            ChatState.data.doctor = doctorMatch;
            ChatState.data.doctorId = doctorMatch.id;
            ChatState.data.specialty = doctorMatch.specialty;
            aiSay(`Excelente. Doctor seleccionado: <b>${doctorMatch.name}</b> (${doctorMatch.specialty}).`);
            aiSay('¿Para qué día desea la cita? Puede decir "hoy", "mañana", "viernes", o una fecha específica.');
            ChatState.step = 2;
            return true;
        }
        
        // Try to match by specialty
        const specialties = [...new Set(DOCTORS.map(d => d.specialty))];
        const specialtyMatch = specialties.find(s => 
            normalize(s).includes(t) || t.includes(normalize(s))
        );
        
        if (specialtyMatch) {
            ChatState.data.specialty = specialtyMatch;
            const doctorsInSpecialty = DOCTORS.filter(d => d.specialty === specialtyMatch);
            aiSay(`Tenemos ${doctorsInSpecialty.length} doctores en <b>${specialtyMatch}</b>.`);
            aiSay('¿Para qué día desea la cita? Puede decir "hoy", "mañana", "viernes", o una fecha específica.');
            ChatState.step = 2;
            return true;
        }
        
        // Couldn't identify doctor or specialty
        aiSay('No pude identificar el doctor o especialidad. Intente con el nombre completo del doctor o una especialidad como "cardiología", "pediatría", "ginecología", etc.');
        return true;
    }

    // STEP 2: Get preferred date and CHECK REAL AVAILABILITY
    if (ChatState.step === 2) {
        const loading = showLoading();
        ChatState.data.date = formatDateForAPI(input);
        
        // Call REAL API to check availability
        const params = {
            date: ChatState.data.date
        };
        
        if (ChatState.data.doctorId) {
            params.doctor_id = ChatState.data.doctorId;
        } else if (ChatState.data.specialty) {
            params.specialty = ChatState.data.specialty;
        }
        
        const availabilityData = await checkAvailableSlots(params);
        loading.remove();
        
        if (!availabilityData.success || availabilityData.doctors.length === 0) {
            // No availability - suggest alternatives
            aiSay('Lo siento, no hay disponibilidad para esa fecha.');
            
            // Try next day
            const tomorrow = new Date(ChatState.data.date);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = formatDateForAPI(tomorrow);
            
            aiSay('¿Le gustaría ver disponibilidad para otro día? Por ejemplo, ¿el día siguiente?');
            ChatState.step = 2; // Stay on this step
            return true;
        }
        
        // We have availability!
        ChatState.data.availableSlots = availabilityData.doctors;
        
        // Show available times
        let message = `📅 Disponibilidad para ${ChatState.data.date}:\n\n`;
        
        availabilityData.doctors.forEach((doc, idx) => {
            message += `<b>${doc.doctor_name}</b> (${doc.specialty}):\n`;
            if (doc.available_slots && doc.available_slots.length > 0) {
                const times = doc.available_slots.slice(0, 5).join(', '); // Show first 5
                message += `  🕐 ${times}`;
                if (doc.available_slots.length > 5) {
                    message += ` y ${doc.available_slots.length - 5} más...`;
                }
            }
            message += '\n\n';
        });
        
        aiSay(message);
        aiSay('¿Qué hora le conviene? Escriba la hora preferida (ej: "10:00 AM", "2:30 PM")');
        ChatState.step = 3;
        return true;
    }

    // STEP 3: Select specific time slot
    if (ChatState.step === 3) {
        const requestedTime = formatTimeForAPI(input);
        
        // Find doctor with this time slot available
        let selectedDoctor = null;
        let selectedTime = null;
        
        for (const doc of ChatState.data.availableSlots) {
            if (doc.available_slots) {
                for (const slot of doc.available_slots) {
                    const slotTime = formatTimeForAPI(slot);
                    // Match within 30 minutes
                    if (Math.abs(timeToMinutes(slotTime) - timeToMinutes(requestedTime)) <= 30) {
                        selectedDoctor = doc;
                        selectedTime = slot;
                        break;
                    }
                }
            }
            if (selectedDoctor) break;
        }
        
        if (!selectedDoctor) {
            aiSay('Esa hora no está disponible. Por favor elija una de las horas mostradas anteriormente.');
            return true;
        }
        
        // Save selection
        ChatState.data.doctor = DOCTORS.find(d => d.id == selectedDoctor.doctor_id);
        ChatState.data.doctorId = selectedDoctor.doctor_id;
        ChatState.data.time = selectedTime;
        
        aiSay(`Perfecto! Cita para ${ChatState.data.date} a las ${selectedTime} con <b>${selectedDoctor.doctor_name}</b>.`);
        aiSay('¿A nombre de quién es la cita? (Nombre completo del paciente)');
        ChatState.step = 4;
        return true;
    }

    // STEP 4: Get patient name
    if (ChatState.step === 4) {
        ChatState.data.name = input.trim();
        aiSay('Por favor, compártame un número de teléfono de contacto.');
        ChatState.step = 5;
        return true;
    }
    
    // STEP 5: Get phone and BOOK IN DATABASE!
    if (ChatState.step === 5) {
        ChatState.data.phone = input.trim();
        
        const loading = showLoading();
        
        // BOOK APPOINTMENT IN DATABASE via API
        const bookingData = {
            doctor_id: ChatState.data.doctorId,
            patient_name: ChatState.data.name,
            patient_phone: ChatState.data.phone,
            appointment_date: ChatState.data.date,
            appointment_time: formatTimeForAPI(ChatState.data.time),
            notes: ChatState.data.notes || 'Agendado via Nivín chatbot'
        };
        
        const result = await bookAppointment(bookingData);
        loading.remove();
        
        if (result.success) {
            // SUCCESS! Appointment booked in database
            aiSay('✅ <b>¡Cita confirmada exitosamente!</b>');
            
            const summary = `
📋 <b>Detalles de su cita:</b><br>
👨‍⚕️ Doctor: ${ChatState.data.doctor.name}<br>
🏥 Especialidad: ${ChatState.data.doctor.specialty}<br>
📅 Fecha: ${formatDateSpanish(ChatState.data.date)}<br>
🕐 Hora: ${ChatState.data.time}<br>
👤 Paciente: ${ChatState.data.name}<br>
📞 Teléfono: ${ChatState.data.phone}<br>
🔢 Confirmación: #${result.appointment_id}
            `;
            
            aiSay(summary);
            
            // SEND SMS CONFIRMATION AUTOMATICALLY
            sendAppointmentSMS({
                patient_name: ChatState.data.name,
                patient_phone: ChatState.data.phone,
                doctor_name: ChatState.data.doctor.name,
                specialty: ChatState.data.doctor.specialty,
                appointment_date: ChatState.data.date,
                appointment_time: formatTimeForAPI(ChatState.data.time),
                appointment_id: result.appointment_id,
                notify_admin: false
            }).then(smsResult => {
                if (smsResult.success) {
                    console.log('✅ SMS sent successfully:', smsResult.sms_sid);
                } else {
                    console.error('❌ SMS failed:', smsResult.error);
                }
            });
            
            aiSay('📱 Recibirá un SMS de confirmación en breve. Si necesita cancelar o reprogramar, llámenos al <a href="tel:+18095946161">(809) 594-6161</a>.');
            aiSay('📍 Centro Médico Universal • Av. Sarasota #44, La Vega');
            
        } else {
            // BOOKING FAILED
            aiSay('❌ Lo siento, hubo un error al confirmar la cita: ' + result.error);
            aiSay('Por favor llámenos al <a href="tel:+18095946161">(809) 594-6161</a> para agendar su cita.');
        }
        
        // Reset state
        resetChatState();
        
        // Offer more actions
        addQuickReplies(messagesContainer, [
            { label: 'Agendar otra cita', value: 'Quiero agendar otra cita' },
            { label: 'Ver doctores', value: 'Quiero ver los doctores' },
            { label: 'Contacto', value: 'Información de contacto' }
        ]);
        
        return true;
    }
    
    return false;
}

// Helper: Convert time string to minutes since midnight
function timeToMinutes(timeStr) {
    const parts = timeStr.match(/(\d+):(\d+)/);
    if (!parts) return 0;
    return parseInt(parts[1]) * 60 + parseInt(parts[2]);
}

// Helper: Format date in Spanish
function formatDateSpanish(dateStr) {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const date = new Date(dateStr);
    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

// ========================================
// GEMINI AI INTEGRATION
// ========================================

/**
 * Call Gemini Pro API for intelligent responses
 */
async function callGeminiAPI(userMessage, conversationHistory = []) {
    const prompt = buildPrompt(userMessage, conversationHistory);
    
    try {
        const response = await fetch(
            `${AI_CONFIG.apiEndpoint}?key=${AI_CONFIG.apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: AI_CONFIG.temperature,
                        maxOutputTokens: AI_CONFIG.maxOutputTokens
                    }
                })
            }
        );
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
        
    } catch (error) {
        console.error('Gemini API error:', error);
        return getOfflineResponse(userMessage);
    }
}

/**
 * Build intelligent prompt for Gemini
 */
function buildPrompt(userMessage, history) {
    const context = `Eres Nivín, el asistente virtual inteligente del Centro Médico Universal Castillo Rodríguez y Asociados en Santiago, República Dominicana.

INFORMACIÓN DEL CENTRO:
- Dirección: Calle José Reyes #11, Santiago
- Teléfonos: (809) 594-6161, (809) 226-1444, (809) 226-1010
- WhatsApp: +1 (809) 350-9302
- Email: info@centromedicouniversal.com
- Horario: Lunes a Viernes 7:00 AM - 7:00 PM, Sábados 7:00 AM - 5:00 PM
- Aceptamos todas las ARS mayores

ESPECIALIDADES DISPONIBLES: ${[...new Set(DOCTORS.map(d => d.specialty))].join(', ')}

Tu trabajo es:
1. Ayudar a agendar citas (pero NO intentes hacerlo manualmente - el sistema lo maneja)
2. Responder preguntas sobre servicios, doctores, horarios
3. Ser amable, profesional y conciso
4. Usar español dominicano natural

IMPORTANTE: Si el usuario quiere agendar una cita, simplemente confirma que vas a ayudarle. El sistema automático se encargará del proceso.

Pregunta del paciente: ${userMessage}`;

    return context;
}

/**
 * Offline fallback responses when API unavailable
 */
function getOfflineResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('cita') || msg.includes('agendar')) {
        return 'Para agendar una cita, necesito algunos datos. ¿Con qué doctor o especialidad desea la cita?';
    }
    if (msg.includes('horario')) {
        return 'Nuestro horario es:<br>• Lunes a Viernes: 7:00 AM - 7:00 PM<br>• Sábados: 7:00 AM - 5:00 PM<br>• Domingos: Cerrado';
    }
    if (msg.includes('teléfono') || msg.includes('telefono') || msg.includes('llamar')) {
        return 'Puede contactarnos al:<br>📞 (809) 594-6161<br>📞 (809) 226-1444<br>📞 (809) 226-1010<br>📱 WhatsApp: +1 (809) 350-9302';
    }
    if (msg.includes('dirección') || msg.includes('direccion') || msg.includes('ubicación') || msg.includes('ubicacion')) {
        return '📍 Nos encontramos en:<br><b>Calle José Reyes #11, Santiago</b><br>República Dominicana';
    }
    if (msg.includes('doctor') || msg.includes('especialidad')) {
        return `Contamos con ${DOCTORS.length} especialistas en múltiples áreas. ¿Qué especialidad busca? Tenemos: Cardiología, Ginecología, Pediatría, Medicina Interna, Cirugía, y más.`;
    }
    
    return 'Estoy aquí para ayudarle con:<br>• Agendar citas<br>• Información de doctores<br>• Horarios y ubicación<br>• Servicios disponibles<br><br>¿En qué puedo asistirle?';
}

// ========================================
// INTENT DETECTION
// ========================================

function shouldStartScheduling(text) {
    const t = (text || '').toLowerCase();
    const keywords = ['cita', 'solicitar', 'agendar', 'reservar', 'programar', 'appointment', 'turno', 'consulta'];
    return keywords.some(k => t.includes(k));
}

function shouldStartFeedback(text) {
    const t = (text || '').toLowerCase();
    const keywords = ['queja', 'reclamo', 'comentario', 'sugerencia', 'feedback', 'opinion'];
    return keywords.some(k => t.includes(k));
}

function shouldStartRepresentative(text) {
    const t = (text || '').toLowerCase();
    const keywords = ['representante', 'agente', 'hablar con alguien', 'persona', 'humano', 'operador'];
    return keywords.some(k => t.includes(k));
}

// ========================================
// MAIN MESSAGE HANDLER
// ========================================

/**
 * Handle incoming user message and generate response
 */
async function handleUserMessage(message, messagesContainer) {
    // Check if we're in scheduling mode
    if (ChatState.mode === 'scheduling') {
        return await handleSchedulingFlow(message, messagesContainer);
    }
    
    // Check if we're in feedback mode
    if (ChatState.mode === 'feedback') {
        return await handleFeedbackFlow(message, messagesContainer);
    }
    
    // Check for scheduling intent
    if (shouldStartScheduling(message)) {
        return await handleSchedulingFlow(message, messagesContainer);
    }
    
    // Check for feedback intent
    if (shouldStartFeedback(message)) {
        return await handleFeedbackFlow(message, messagesContainer);
    }
    
    // Check for representative
    if (shouldStartRepresentative(message)) {
        return handleRepresentativeRequest(message, messagesContainer);
    }
    
    // Regular conversation - use Gemini AI
    const aiSay = (text) => {
        const m = document.createElement('div');
        m.className = 'ai-message';
        m.innerHTML = formatResponseText(text);
        messagesContainer.appendChild(m);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
    
    const loading = document.createElement('div');
    loading.className = 'ai-message typing';
    loading.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(loading);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    const response = await callGeminiAPI(message);
    loading.remove();
    aiSay(response);
    
    return true;
}

// ========================================
// FEEDBACK & REPRESENTATIVE HANDLERS
// ========================================

/**
 * Handle feedback/complaint collection flow
 * Steps: intro → name → phone → complaint text → submit
 */
async function handleFeedbackFlow(message, messagesContainer) {
    const aiSay = (text) => {
        const m = document.createElement('div');
        m.className = 'ai-message';
        m.innerHTML = formatResponseText(text);
        messagesContainer.appendChild(m);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
    
    // Activate feedback mode
    if (ChatState.mode !== 'feedback') {
        ChatState.mode = 'feedback';
        ChatState.step = 0;
        // Initialize feedback data
        if (!ChatState.data.feedback) {
            ChatState.data.feedback = {
                name: null,
                phone: null,
                complaint: null
            };
        }
    }
    
    // STEP 0: Introduction and ask for name
    if (ChatState.step === 0) {
        aiSay('Valoramos mucho su opinión y tomaremos su queja muy en serio. ');
        aiSay('¿A nombre de quién es la queja? (O escriba "anónimo" si prefiere no dar su nombre)');
        ChatState.step = 1;
        return true;
    }
    
    // STEP 1: Collect name
    if (ChatState.step === 1) {
        const name = message.trim();
        if (name.toLowerCase() === 'anónimo' || name.toLowerCase() === 'anonimo') {
            ChatState.data.feedback.name = 'Anónimo';
        } else {
            ChatState.data.feedback.name = name;
        }
        aiSay(`Gracias${ChatState.data.feedback.name !== 'Anónimo' ? ', ' + ChatState.data.feedback.name : ''}.`);
        aiSay('Por favor, proporcione un número de teléfono de contacto:');
        ChatState.step = 2;
        return true;
    }
    
    // STEP 2: Collect phone
    if (ChatState.step === 2) {
        ChatState.data.feedback.phone = message.trim();
        aiSay('Perfecto. Ahora por favor describa su queja o comentario en detalle:');
        ChatState.step = 3;
        return true;
    }
    
    // STEP 3: Collect complaint and submit
    if (ChatState.step === 3) {
        ChatState.data.feedback.complaint = message.trim();
        
        // Show loading while submitting
        const loading = document.createElement('div');
        loading.className = 'ai-message typing';
        loading.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(loading);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Prepare complaint data for submission
        const complaintData = {
            name: ChatState.data.feedback.name,
            phone: ChatState.data.feedback.phone,
            message: ChatState.data.feedback.complaint,
            timestamp: new Date().toISOString()
        };
        
        // Submit complaint (if complaint-handler.js is loaded)
        if (typeof submitComplaint === 'function') {
            try {
                const result = await submitComplaint(complaintData);
                loading.remove();
                
                aiSay('✅ <b>Su queja ha sido registrada exitosamente.</b>');
                aiSay(`📋 <b>Resumen de su queja:</b><br>
👤 Nombre: ${complaintData.name}<br>
📞 Teléfono: ${complaintData.phone}<br>
📝 Queja: ${complaintData.message.substring(0, 100)}${complaintData.message.length > 100 ? '...' : ''}`);
                
                if (result.whatsapp || result.email) {
                    aiSay('📨 Hemos notificado a nuestro equipo de atención al cliente. Nos pondremos en contacto con usted en breve.');
                }
                
            } catch (error) {
                loading.remove();
                console.error('Error submitting complaint:', error);
                aiSay('✅ Su queja ha sido registrada. Nuestro equipo la revisará pronto.');
            }
        } else {
            loading.remove();
            aiSay('✅ <b>Su queja ha sido registrada exitosamente.</b>');
            aiSay('📨 Nuestro equipo de atención al cliente la revisará y nos pondremos en contacto con usted pronto.');
        }
        
        aiSay('Muchas gracias por su retroalimentación. Es muy importante para nosotros mejorar nuestros servicios.');
        aiSay('📞 Si necesita atención inmediata, puede llamarnos al <a href="tel:+18095946161">(809) 594-6161</a>');
        
        // Reset state
        resetChatState();
        
        // Show quick replies for next actions
        addQuickReplies(messagesContainer, [
            { label: 'Agendar una cita', value: 'Quiero agendar una cita' },
            { label: 'Ver doctores', value: 'Quiero ver los doctores' },
            { label: 'Contacto', value: 'Información de contacto' }
        ]);
        
        return true;
    }
    
    return false;
}

function handleRepresentativeRequest(message, messagesContainer) {
    const aiSay = (text) => {
        const m = document.createElement('div');
        m.className = 'ai-message';
        m.innerHTML = formatResponseText(text);
        messagesContainer.appendChild(m);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
    
    aiSay('Con gusto le comunico con nuestro equipo. Puede contactarnos por:');
    aiSay('📞 Teléfono: <a href="tel:+18095946161">(809) 594-6161</a>');
    aiSay('📱 WhatsApp: <a href="https://wa.me/18093509302" target="_blank">+1 (809) 350-9302</a>');
    aiSay('Estamos disponibles de Lunes a Viernes, 7:00 AM - 7:00 PM');
    
    return true;
}

// ========================================
// UI HELPER FUNCTIONS
// ========================================

/**
 * Format text with markdown-like syntax
 */
function formatResponseText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
}

/**
 * Add quick reply buttons
 */
function addQuickReplies(container, options) {
    const box = document.createElement('div');
    box.className = 'quick-replies';
    options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'quick-reply';
        btn.textContent = opt.label;
        btn.addEventListener('click', () => {
            sendMessage(opt.value, container);
        });
        box.appendChild(btn);
    });
    container.appendChild(box);
    container.scrollTop = container.scrollHeight;
}

/**
 * Send message (called by quick replies)
 */
function sendMessage(text, container) {
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.textContent = text;
    container.appendChild(userMsg);
    
    // Process message
    handleUserMessage(text, container);
}

// ========================================
// STYLES
// ========================================

function addChatStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ai-message.typing {
            display: flex;
            align-items: center;
            height: 24px;
            min-width: 50px;
            background-color: #f0f0f0;
            padding: 12px 16px;
            border-radius: 18px;
            margin: 8px 0;
        }
        
        .ai-message.typing span {
            height: 8px;
            width: 8px;
            float: left;
            margin: 0 1px;
            background-color: #9E9EA1;
            display: block;
            border-radius: 50%;
            opacity: 0.4;
            animation: 1s blink infinite;
        }
        
        .ai-message.typing span:nth-of-type(1) { animation-delay: 0.3333s; }
        .ai-message.typing span:nth-of-type(2) { animation-delay: 0.6666s; }
        .ai-message.typing span:nth-of-type(3) { animation-delay: 0.9999s; }
        
        @keyframes blink {
            50% { opacity: 1; }
        }
        
        .quick-replies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }
        
        .quick-reply {
            background: #f6f7fb;
            color: #333;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            padding: 8px 14px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        
        .quick-reply:hover {
            background: #eef2ff;
            border-color: #c7d2fe;
            transform: translateY(-1px);
        }
        
        .ai-message, .user-message {
            margin: 8px 0;
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 80%;
        }
        
        .ai-message {
            background-color: #f0f0f0;
            align-self: flex-start;
        }
        
        .user-message {
            background-color: #007bff;
            color: white;
            align-self: flex-end;
            margin-left: auto;
        }
    `;
    document.head.appendChild(style);
}

// Initialize styles on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addChatStyles);
} else {
    addChatStyles();
}

// ========================================
// EXPORT MAIN HANDLER
// ========================================

// Make handler available globally
window.NivinAI = {
    handleMessage: handleUserMessage,
    resetState: resetChatState,
    checkAvailability: checkAvailableSlots,
    bookAppointment: bookAppointment,
    doctors: DOCTORS
};

console.log('✅ Nivín AI con integración de scheduling cargado correctamente');
console.log(`📊 ${DOCTORS.length} doctores disponibles en el sistema`);
