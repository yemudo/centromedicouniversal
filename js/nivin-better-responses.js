// Nivin Better Response Templates
// Centro Médico Universal

const NIVIN_RESPONSES = {
    // INSTEAD OF: "Perfecto. ¿Con cuál doctor(a) desea agendar su cita?"
    // USE THIS:
    doctorSelection: `
¿Cómo prefiere seleccionar su doctor?

1️⃣ VER ESPECIALISTAS DISPONIBLES
2️⃣ BUSCAR POR NOMBRE DE DOCTOR
3️⃣ VER TODOS LOS DOCTORES HOY
4️⃣ PRÓXIMA CITA DISPONIBLE

O escriba directamente:
• Nombre del doctor (ej: "Dr. Castillo")
• Especialidad (ej: "Cardiología")
• Síntoma (ej: "dolor de cabeza")
    `,
    
    // When showing available specialists
    showSpecialists: `
📋 ESPECIALISTAS DISPONIBLES HOY:

CARDIOLOGÍA (3 doctores)
✅ Dr. Joaquín Ramírez - 2:00 PM, 4:00 PM
✅ Dr. Juan Peña - 3:00 PM
✅ Dr. Oscar Hache - 5:00 PM

PEDIATRÍA (5 doctores)
✅ Dra. Ana Torres - 9:00 AM, 10:00 AM
✅ Dr. Luis Martínez - 11:00 AM, 2:00 PM
[Ver más pediatras...]

GINECOLOGÍA (4 doctores)
✅ Dra. Vidalva Medina - 3:00 PM, 4:00 PM
✅ Dra. Carmen Vásquez - 10:00 AM
[Ver más ginecólogos...]

Escriba el número de la especialidad o el nombre del doctor.
    `,
    
    // When user types a doctor name
    doctorSearch: (searchTerm) => {
        return `
Buscando "${searchTerm}"...

RESULTADOS:
1. Dr. Manuel Antonio Castillo - Salud Sexual
   ✅ HOY: 2:00 PM, 3:00 PM, 5:00 PM
   
2. Dr. Pedro Rafael Castillo - Gastroenterología
   ✅ HOY: 10:00 AM, 11:00 AM
   
3. Dr. Castillo Rodríguez - Medicina Interna
   ✅ MAÑANA: 9:00 AM, 10:00 AM

Seleccione 1, 2 o 3 para ver calendario completo.
        `;
    },
    
    // Quick options menu
    quickMenu: `
¿QUÉ NECESITA?

🔴 EMERGENCIA → Ir a emergencias ahora
🟡 HOY → Ver doctores disponibles hoy
🟢 ESTA SEMANA → Buscar cita esta semana

BUSCAR POR:
📋 Especialidad (escriba: "cardiólogo")
👨‍⚕️ Doctor (escriba: "Dr. Ramírez")
🤒 Síntoma (escriba: "dolor de pecho")

O escriba "ayuda" para más opciones.
    `,
    
    // When showing a single doctor's availability
    doctorCalendar: (doctor) => {
        return `
📅 ${doctor.name}
${doctor.specialty}

HOY (Viernes 25):
✅ 2:00 PM - Disponible
✅ 3:00 PM - Disponible
❌ 4:00 PM - Ocupado
✅ 5:00 PM - Disponible

MAÑANA (Sábado 26):
✅ 9:00 AM - Disponible
✅ 10:00 AM - Disponible

Para reservar escriba:
• "HOY 2PM"
• "MAÑANA 9AM"
• "PRÓXIMA" (siguiente disponible)
        `;
    },
    
    // Intelligent prompts based on user behavior
    smartPrompts: {
        noInput: "Puedo buscar por síntoma, especialidad o nombre del doctor. ¿Qué prefiere?",
        unclear: "No entendí. ¿Busca un doctor específico o una especialidad?",
        noAvailability: "No hay disponibilidad hoy. ¿Veo mañana o lista de espera?",
        multipleOptions: "Encontré varias opciones. ¿Cuál prefiere?"
    }
};

// Function to handle user input intelligently
function processUserInput(input) {
    const lowerInput = input.toLowerCase().trim();
    
    // Check if it's a number selection
    if (/^[1-9]$/.test(input)) {
        return { type: 'number_selection', value: parseInt(input) };
    }
    
    // Check if it's a doctor name
    if (lowerInput.includes('dr.') || lowerInput.includes('dra.')) {
        return { type: 'doctor_search', value: input };
    }
    
    // Check if it's a specialty
    const specialties = [
        'cardiología', 'pediatría', 'ginecología', 'ortopedia',
        'neurología', 'dermatología', 'gastroenterología', 'urología'
    ];
    
    for (const specialty of specialties) {
        if (lowerInput.includes(specialty)) {
            return { type: 'specialty_search', value: specialty };
        }
    }
    
    // Check if it's a symptom
    const symptoms = [
        'dolor', 'fiebre', 'tos', 'mareo', 'náusea', 
        'alergia', 'fractura', 'embarazo'
    ];
    
    for (const symptom of symptoms) {
        if (lowerInput.includes(symptom)) {
            return { type: 'symptom_search', value: input };
        }
    }
    
    // Check for time preferences
    if (lowerInput.includes('hoy') || lowerInput.includes('ahora')) {
        return { type: 'today_request' };
    }
    
    if (lowerInput.includes('mañana')) {
        return { type: 'tomorrow_request' };
    }
    
    if (lowerInput.includes('urgente') || lowerInput.includes('emergencia')) {
        return { type: 'emergency' };
    }
    
    // Default
    return { type: 'unclear', value: input };
}

// Better interaction flow
function generateSmartResponse(userInput) {
    const processed = processUserInput(userInput);
    
    switch(processed.type) {
        case 'doctor_search':
            return NIVIN_RESPONSES.doctorSearch(processed.value);
            
        case 'specialty_search':
            return showSpecialtyDoctors(processed.value);
            
        case 'symptom_search':
            return findDoctorBySymptom(processed.value);
            
        case 'today_request':
            return NIVIN_RESPONSES.showSpecialists;
            
        case 'emergency':
            return emergencyResponse();
            
        case 'unclear':
        default:
            return NIVIN_RESPONSES.quickMenu;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NIVIN_RESPONSES,
        processUserInput,
        generateSmartResponse
    };
}
