// Nivin Symptom-to-Specialist Mapping
// Centro Médico Universal - Enhanced Symptom Intelligence

const SYMPTOM_SPECIALIST_MAP = {
    // HEAD & NEUROLOGICAL
    'dolor de cabeza': {
        specialties: ['Neurología', 'Medicina Interna'],
        urgency: 'normal',
        notes: 'Si es súbito y severo, enviar a emergencia'
    },
    'migraña': {
        specialties: ['Neurología'],
        urgency: 'normal',
        notes: 'Considerar historial de migrañas'
    },
    'mareo': {
        specialties: ['Neurología', 'Otorrinolaringología', 'Cardiología'],
        urgency: 'normal',
        notes: 'Puede ser oído interno o cardiovascular'
    },
    'convulsiones': {
        specialties: ['Neurología'],
        urgency: 'urgent',
        notes: 'Requiere atención pronta'
    },

    // CHEST & CARDIAC
    'dolor de pecho': {
        specialties: ['Cardiología', 'Medicina Interna'],
        urgency: 'urgent',
        notes: 'URGENTE si viene con falta de aire'
    },
    'palpitaciones': {
        specialties: ['Cardiología'],
        urgency: 'normal',
        notes: 'Preguntar sobre frecuencia y duración'
    },
    'presión alta': {
        specialties: ['Cardiología', 'Medicina Interna'],
        urgency: 'normal',
        notes: 'Control rutinario importante'
    },
    'falta de aire': {
        specialties: ['Cardiología', 'Neumología'],
        urgency: 'urgent',
        notes: 'Evaluar urgencia según severidad'
    },

    // DIGESTIVE
    'dolor de estómago': {
        specialties: ['Gastroenterología', 'Medicina Interna'],
        urgency: 'normal',
        notes: 'Preguntar sobre alimentación reciente'
    },
    'dolor abdominal': {
        specialties: ['Gastroenterología', 'Cirugía General'],
        urgency: 'normal',
        notes: 'Si es agudo en lado derecho, puede ser apendicitis'
    },
    'acidez': {
        specialties: ['Gastroenterología'],
        urgency: 'normal',
        notes: 'Común, pero si es frecuente necesita evaluación'
    },
    'vómito': {
        specialties: ['Gastroenterología', 'Medicina Interna'],
        urgency: 'normal',
        notes: 'Si es con sangre, es urgente'
    },
    'diarrea': {
        specialties: ['Gastroenterología', 'Medicina Interna'],
        urgency: 'normal',
        notes: 'Hidratación importante'
    },

    // WOMEN'S HEALTH
    'embarazo': {
        specialties: ['Ginecología y Obstetricia'],
        urgency: 'normal',
        notes: 'Control prenatal regular'
    },
    'menstruación irregular': {
        specialties: ['Ginecología'],
        urgency: 'normal',
        notes: 'Puede requerir estudios hormonales'
    },
    'dolor pélvico': {
        specialties: ['Ginecología', 'Urología'],
        urgency: 'normal',
        notes: 'Evaluar según género del paciente'
    },
    'sangrado vaginal': {
        specialties: ['Ginecología y Obstetricia'],
        urgency: 'urgent',
        notes: 'Urgente si es abundante o en embarazo'
    },

    // PEDIATRIC
    'fiebre en niño': {
        specialties: ['Pediatría'],
        urgency: 'urgent',
        notes: 'Urgente si es bebé menor de 3 meses'
    },
    'niño no come': {
        specialties: ['Pediatría'],
        urgency: 'normal',
        notes: 'Evaluar pérdida de peso'
    },
    'erupción en bebé': {
        specialties: ['Pediatría', 'Dermatología'],
        urgency: 'normal',
        notes: 'Puede ser alergia'
    },
    'tos en niño': {
        specialties: ['Pediatría', 'Neumología Pediátrica'],
        urgency: 'normal',
        notes: 'Si tiene dificultad respiratoria es urgente'
    },

    // ORTHOPEDIC
    'dolor de espalda': {
        specialties: ['Ortopedia', 'Traumatología'],
        urgency: 'normal',
        notes: 'Común, evaluar postura y actividad'
    },
    'dolor de rodilla': {
        specialties: ['Ortopedia', 'Traumatología'],
        urgency: 'normal',
        notes: 'Puede necesitar radiografía'
    },
    'fractura': {
        specialties: ['Traumatología', 'Ortopedia'],
        urgency: 'urgent',
        notes: 'Necesita rayos X urgente'
    },
    'esguince': {
        specialties: ['Ortopedia', 'Traumatología'],
        urgency: 'normal',
        notes: 'RICE: Reposo, hielo, compresión, elevación'
    },

    // SKIN
    'alergia en piel': {
        specialties: ['Dermatología', 'Medicina Interna'],
        urgency: 'normal',
        notes: 'Si afecta respiración es urgente'
    },
    'acné': {
        specialties: ['Dermatología'],
        urgency: 'normal',
        notes: 'Tratamiento según severidad'
    },
    'manchas en piel': {
        specialties: ['Dermatología'],
        urgency: 'normal',
        notes: 'Evaluar cambios recientes'
    },

    // UROLOGICAL
    'dolor al orinar': {
        specialties: ['Urología', 'Ginecología'],
        urgency: 'normal',
        notes: 'Posible infección urinaria'
    },
    'sangre en orina': {
        specialties: ['Urología'],
        urgency: 'urgent',
        notes: 'Requiere evaluación pronta'
    },
    'problemas de próstata': {
        specialties: ['Urología'],
        urgency: 'normal',
        notes: 'Común en hombres mayores de 50'
    },

    // ENT (Ear, Nose, Throat)
    'dolor de oído': {
        specialties: ['Otorrinolaringología', 'Pediatría'],
        urgency: 'normal',
        notes: 'Común en niños'
    },
    'sinusitis': {
        specialties: ['Otorrinolaringología'],
        urgency: 'normal',
        notes: 'Puede requerir antibióticos'
    },
    'ronquera': {
        specialties: ['Otorrinolaringología'],
        urgency: 'normal',
        notes: 'Si persiste más de 2 semanas, evaluar'
    },

    // ENDOCRINE
    'diabetes': {
        specialties: ['Endocrinología', 'Medicina Interna'],
        urgency: 'normal',
        notes: 'Control regular importante'
    },
    'tiroides': {
        specialties: ['Endocrinología'],
        urgency: 'normal',
        notes: 'Requiere análisis de laboratorio'
    },
    'pérdida de peso': {
        specialties: ['Endocrinología', 'Medicina Interna', 'Nutriología'],
        urgency: 'normal',
        notes: 'Evaluar si es intencional o no'
    },

    // GENERAL
    'chequeo general': {
        specialties: ['Medicina Interna'],
        urgency: 'normal',
        notes: 'Preventivo anual recomendado'
    },
    'cansancio': {
        specialties: ['Medicina Interna', 'Cardiología'],
        urgency: 'normal',
        notes: 'Puede ser anemia o tiroides'
    },
    'insomnio': {
        specialties: ['Medicina Interna', 'Neurología'],
        urgency: 'normal',
        notes: 'Evaluar hábitos de sueño'
    }
};

// Function to find best specialist match
function findBestSpecialist(userInput) {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    // Check each symptom pattern
    for (const [symptom, data] of Object.entries(SYMPTOM_SPECIALIST_MAP)) {
        // Calculate match score
        let score = 0;
        const symptomWords = symptom.split(' ');
        const inputWords = input.split(' ');
        
        // Check if symptom is contained in input
        if (input.includes(symptom)) {
            score = 100; // Exact match
        } else {
            // Check word overlap
            symptomWords.forEach(word => {
                if (inputWords.includes(word) && word.length > 3) {
                    score += 30;
                }
            });
        }
        
        if (score > highestScore) {
            highestScore = score;
            bestMatch = {
                symptom,
                ...data
            };
        }
    }
    
    // Default if no match
    if (!bestMatch || highestScore < 30) {
        return {
            symptom: 'consulta general',
            specialties: ['Medicina Interna'],
            urgency: 'normal',
            notes: 'Evaluación inicial recomendada'
        };
    }
    
    return bestMatch;
}

// Nivin's intelligent response generator
function generateNivinResponse(symptomMatch, availableDoctors) {
    let response = '';
    
    // Urgency warning
    if (symptomMatch.urgency === 'urgent') {
        response += '⚠️ ATENCIÓN: Este síntoma puede requerir atención urgente.\n\n';
    }
    
    // Specialist recommendation
    response += `Para "${symptomMatch.symptom}" recomiendo:\n`;
    response += `👨‍⚕️ Especialidades: ${symptomMatch.specialties.join(' o ')}\n\n`;
    
    // Show available doctors
    if (availableDoctors.length > 0) {
        response += '✅ DOCTORES DISPONIBLES:\n\n';
        availableDoctors.forEach((doc, i) => {
            response += `${i + 1}. ${doc.name}\n`;
            response += `   ${doc.specialty}\n`;
            if (doc.availableToday && doc.availableToday.length > 0) {
                response += `   HOY: ${doc.availableToday[0]}\n`;
            } else if (doc.nextAvailable) {
                response += `   Próximo: ${doc.nextAvailable}\n`;
            }
            response += '\n';
        });
        response += 'Escriba el número para reservar.\n';
    } else {
        response += '❌ No hay disponibilidad inmediata.\n';
        response += '¿Desea que lo agregue a lista de espera?\n';
    }
    
    // Add notes if relevant
    if (symptomMatch.notes) {
        response += `\n💡 Nota: ${symptomMatch.notes}`;
    }
    
    return response;
}

// Export for use in Netlify function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SYMPTOM_SPECIALIST_MAP,
        findBestSpecialist,
        generateNivinResponse
    };
}
