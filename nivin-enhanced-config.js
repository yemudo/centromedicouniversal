// Enhanced Nivin AI Assistant Configuration
// For Centro Médico Universal

const NIVIN_CAPABILITIES = {
    // 1. SMART DOCTOR SEARCH
    searchDoctors: {
        bySpecialty: "Buscar por especialidad (ej: 'necesito un cardiólogo')",
        bySymptom: "Sugerir especialista por síntoma (ej: 'me duele el pecho')",
        byName: "Buscar doctor por nombre",
        showAvailable: "Mostrar solo doctores disponibles hoy/mañana"
    },

    // 2. REAL-TIME AVAILABILITY CHECK
    checkAvailability: {
        todaySlots: "Ver espacios disponibles hoy",
        thisWeek: "Ver disponibilidad esta semana",
        nextAvailable: "Próxima cita disponible con [doctor]",
        urgentSlots: "Espacios para urgencias (mismo día)"
    },

    // 3. SMART BOOKING
    booking: {
        quickBook: "Reservar próxima disponible",
        compareSchedules: "Comparar horarios de múltiples doctores",
        waitlist: "Lista de espera si no hay disponibilidad",
        recurring: "Citas recurrentes (ej: control mensual)"
    },

    // 4. PATIENT CONVENIENCE
    patientFeatures: {
        reminder: "Recordatorio 24h antes por WhatsApp",
        directions: "Direcciones al consultorio",
        preparation: "Qué llevar/preparación para la cita",
        insurance: "Verificar cobertura de seguro"
    },

    // 5. INTELLIGENT RESPONSES
    smartResponses: {
        symptomTriage: "Evaluar urgencia del síntoma",
        alternativeOptions: "Si no hay cita, sugerir telemedicina o urgencias",
        doctorInfo: "Info del doctor: experiencia, especialidades",
        waitTime: "Tiempo de espera estimado en consulta"
    }
};

// NIVIN CONVERSATION FLOWS
const NIVIN_FLOWS = {
    // Opening Message
    greeting: `Hola! Soy Nivin, tu asistente médico 🏥
    
Puedo ayudarte con:
1️⃣ Ver doctores disponibles HOY
2️⃣ Buscar especialista por síntoma
3️⃣ Agendar cita rápida
4️⃣ Ver horarios de tu doctor preferido

¿Qué necesitas?`,

    // Quick Actions Menu
    quickActions: [
        {
            text: "🔴 URGENCIA - Ver disponible ahora",
            action: "urgent_appointment"
        },
        {
            text: "📋 Ver mis próximas citas",
            action: "my_appointments"
        },
        {
            text: "👨‍⚕️ Buscar doctor por especialidad",
            action: "search_specialty"
        },
        {
            text: "📅 Ver calendario de doctor específico",
            action: "doctor_calendar"
        }
    ],

    // Symptom-to-Specialty Mapping
    symptomMapping: {
        "dolor de cabeza": ["Neurología", "Medicina Interna"],
        "dolor de pecho": ["Cardiología", "Medicina Interna", "URGENCIAS"],
        "dolor abdominal": ["Gastroenterología", "Cirugía General"],
        "problemas ginecológicos": ["Ginecología"],
        "niño enfermo": ["Pediatría"],
        "dolor de huesos": ["Ortopedia", "Traumatología"],
        "problemas de visión": ["Oftalmología"],
        "problemas de oído": ["Otorrinolaringología"],
        "diabetes": ["Endocrinología", "Medicina Interna"],
        "presión alta": ["Cardiología", "Medicina Interna"],
        "problemas urinarios": ["Urología"],
        "problemas de piel": ["Dermatología"],
        "salud mental": ["Psiquiatría"],
        "chequeo general": ["Medicina Interna"],
        "embarazo": ["Ginecología y Obstetricia"]
    },

    // Calendar Display Format
    calendarView: `
📅 *DISPONIBILIDAD DR. [NOMBRE]*
    
HOY (Viernes):
✅ 2:00 PM - Disponible
✅ 3:00 PM - Disponible
❌ 4:00 PM - Ocupado
✅ 5:00 PM - Disponible

MAÑANA (Sábado):
✅ 9:00 AM - Disponible
✅ 10:00 AM - Disponible
✅ 11:00 AM - Disponible

Escriba la hora deseada o "próxima disponible"`,

    // Booking Confirmation
    bookingConfirmation: `
✅ CITA CONFIRMADA

📋 Detalles:
• Doctor: [NOMBRE]
• Fecha: [FECHA]
• Hora: [HORA]
• Consultorio: [NUMERO]

📍 Dirección: Centro Médico Universal
📞 Confirmar: (809) 594-6161

⏰ Recordatorio: Le enviaremos WhatsApp 24h antes

¿Necesita algo más?`
};

// ENHANCED FEATURES FOR IMPLEMENTATION
const ADVANCED_FEATURES = {
    // Voice Integration
    voiceFeatures: {
        voiceToText: "Dictar síntomas por voz",
        textToVoice: "Escuchar respuestas de Nivin",
        callToBook: "Llamar para reservar por voz"
    },

    // Smart Scheduling
    intelligentScheduling: {
        predictiveBooking: "Sugerir citas basadas en historial",
        familyBooking: "Agendar múltiples familiares",
        peakTimeAvoidance: "Sugerir horarios menos congestionados",
        travelTimeConsideration: "Considerar tiempo de viaje del paciente"
    },

    // Integration Features
    integrations: {
        whatsAppBot: "Bot completo en WhatsApp",
        googleCalendar: "Sincronizar con calendario del paciente",
        insuranceAPI: "Verificación automática de cobertura",
        labResults: "Consultar resultados de laboratorio"
    },

    // Analytics for Admin
    analytics: {
        popularSpecialties: "Especialidades más solicitadas",
        peakHours: "Horas pico de consultas",
        noShowRate: "Tasa de ausencias",
        patientSatisfaction: "Satisfacción post-consulta"
    }
};

// IMPLEMENTATION PRIORITIES
const IMPLEMENTATION_PLAN = {
    phase1: [
        "Real-time doctor availability display",
        "Quick booking for 'next available'",
        "WhatsApp integration for reminders",
        "Symptom-to-specialty matching"
    ],
    
    phase2: [
        "Calendar view per doctor",
        "Waitlist functionality",
        "Insurance verification",
        "Multi-language support (Spanish/English/Creole)"
    ],
    
    phase3: [
        "Voice interaction",
        "Predictive scheduling",
        "Telemedicine integration",
        "AI health recommendations"
    ]
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NIVIN_CAPABILITIES,
        NIVIN_FLOWS,
        ADVANCED_FEATURES,
        IMPLEMENTATION_PLAN
    };
}
