/**
 * Centro Médico Universal - Complete Doctors Database (95 Doctors)
 * Synced with DigitalOcean Database - October 2, 2025
 * Source: centro_medico_universal.doctores table
 */

// DOCTORS WITH REAL PHOTOS:
// - Dra. Vidalva Decena Medina - HAS REAL PHOTO ⭐ 
// - Dr. Manuel Antonio Castillo Rodríguez - HAS REAL PHOTO ⭐

const DOCTORS_DATABASE = {
    // Anestesiología (2 doctors)
    'anestesiologia': [
        { name: 'Dr. Félix Ramírez', specialty: 'Anestesiología', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Tomás Reyes', specialty: 'Anestesiología', experience: '12+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Cardiología (3 doctors)
    'cardiologia': [
        { name: 'Dr. Ángel Oviedo', specialty: 'Cardiología', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Julio César Polanco', specialty: 'Cardiología', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Raúl Vásquez Bonilla', specialty: 'Cardiología', experience: '22+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Cirugía General y Especializada (13 doctors)
    'cirugia': [
        { name: 'Dr. Samuel Abreu', specialty: 'Cirugía Bariátrica', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Josman Ventura', specialty: 'Cirugía Cardiovascular', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Wilson Méndez', specialty: 'Cirugía de Tórax', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Santiago Méndez Camacho', specialty: 'Cirugía General', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Leticia I. Vargas Ozuna', specialty: 'Cirugía General', experience: '12+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Keila Verigüete', specialty: 'Cirugía Laparoscópica', experience: '10+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Wilson Canario', specialty: 'Cirugía Plástica', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Alecsandri Gil Zorrilla', specialty: 'Cirujano General', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Carlos Alberto García Rodríguez', specialty: 'Cirujano General', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Edgar Ulises García Gómez', specialty: 'Cirujano General', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Emilio', specialty: 'Cirujano General', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Germán José Javier Filio', specialty: 'Cirujano General', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Johnny Paredes Rodríguez', specialty: 'Cirujano General', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. José R. Ayala Hernández', specialty: 'Cirujano General', experience: '21+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. José Rafael Gallo Mendoza', specialty: 'Cirujano General', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Dermatología (1 doctor)
    'dermatologia': [
        { name: 'Dr. Jesús Cabrera', specialty: 'Dermatología', experience: '14+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Endocrinología (4 doctors)
    'endocrinologia': [
        { name: 'Dr. Jonathan Guzmán García', specialty: 'Endocrinología', experience: '12+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Nelson Pimentel', specialty: 'Endocrinología', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Patricia Gómez Torres', specialty: 'Endocrinología', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Danely Edilia Gómez Morfa', specialty: 'Endocrinología Ginecológica e Infertilidad', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Enfermedades Infecciosas (1 doctor)
    'enfermedades_infecciosas': [
        { name: 'Dr. David Morrobel', specialty: 'Enfermedades Infecciosas', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Gastroenterología (2 doctors)
    'gastroenterologia': [
        { name: 'Dr. Juan Florián Jiménez De Los Santos', specialty: 'Gastroenterología', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Reynaldo Sánchez', specialty: 'Gastroenterología', experience: '15+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Ginecología y Obstetricia (18 doctors)
    'ginecologia': [
        { name: 'Dr. César Augusto Peña Acosta', specialty: 'Ginecología y Obstetricia', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Enmanuel Miranda', specialty: 'Ginecología y Obstetricia', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Francisco Javier Cedeño', specialty: 'Ginecología y Obstetricia', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Reyson Edgar Pavón Fontanilla', specialty: 'Ginecología y Obstetricia', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Adalgiza Ramona Jiménez Jiménez', specialty: 'Ginecología y Obstetricia', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Alcia Crimely Matos Ramírez', specialty: 'Ginecología y Obstetricia', experience: '12+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Andrea Henríquez', specialty: 'Ginecología y Obstetricia', experience: '10+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Emma Francisca Muñoz de Almonte', specialty: 'Ginecología y Obstetricia', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ercilia Maribel Polanco Cruz', specialty: 'Ginecología y Obstetricia', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Eulalia Fiordaliza Castro López', specialty: 'Ginecología y Obstetricia', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Griselda Alt. Basora Ramírez', specialty: 'Ginecología y Obstetricia', experience: '13+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Irsa M. Montero Díaz', specialty: 'Ginecología y Obstetricia', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Julissa María Rojas Hernández', specialty: 'Ginecología y Obstetricia', experience: '11+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Lucía Altagracia de Jesús de Jesús', specialty: 'Ginecología y Obstetricia', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Marilelda Reyes', specialty: 'Ginecología y Obstetricia', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ramona Jiménez', specialty: 'Ginecología y Obstetricia', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { 
            name: 'Dra. Vidalva Decena Medina', 
            specialty: 'Ginecología y Obstetricia', 
            experience: '25+ años', 
            phone: '(809) 594-6161', 
            image: 'images/doctors/vidalva-decena-medina.jpg', // ⭐ REAL PHOTO
            bio: 'Especialista en ginecología dedicada a la atención integral de la salud femenina.' 
        },
        { name: 'Dra. Maribel Mejía Tapia', specialty: 'Ginecología y Obstetricia Oncológica', experience: '20+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Medicina Crítica (1 doctor)
    'medicina_critica': [
        { name: 'Dra. Carla Sánchez', specialty: 'Medicina Crítica y Cuidados Intensivos', experience: '14+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Medicina Interna (17 doctors)
    'medicina_interna': [
        { name: 'Dr. Andrea Valoy Hernández', specialty: 'Medicina Interna', experience: '12+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Andyson De León González', specialty: 'Medicina Interna', experience: '10+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. César Ricardo Guzmán Báez', specialty: 'Medicina Interna', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Francisco Encarnación Almonte', specialty: 'Medicina Interna', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Luis Alberto Garrido De Los Santos', specialty: 'Medicina Interna', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Margen Antonio Cabrera Peguero', specialty: 'Medicina Interna', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Nelson de Jesús', specialty: 'Medicina Interna', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Othon Alexander Batista De Los Santos', specialty: 'Medicina Interna', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Rafael Ismael Tejeda Gómez', specialty: 'Medicina Interna', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Yunior Brito Paredes', specialty: 'Medicina Interna', experience: '11+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ana Belkis Mateo Valdez', specialty: 'Medicina Interna', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Bárbara Altagracia Flores Espinosa', specialty: 'Medicina Interna', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Blanca I. Báez Mena', specialty: 'Medicina Interna', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Félix María Flete Feliz', specialty: 'Medicina Interna', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Miriam de Jesús Pérez Gómez', specialty: 'Medicina Interna', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Sara Altagracia Díaz Acosta', specialty: 'Medicina Interna', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Yudelka Margarita García Acosta', specialty: 'Medicina Interna', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Neurocirugía (1 doctor)
    'neurocirugia': [
        { name: 'Dr. Ángel Martínez Reyes', specialty: 'Neurocirugía', experience: '18+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Neurología (1 doctor)
    'neurologia': [
        { name: 'Dr. Rafael De Jesús Rodríguez', specialty: 'Neurología', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Nutrición (2 doctors)
    'nutricion': [
        { name: 'Dr. Ramón Gómez', specialty: 'Nutrición', experience: '10+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Elsi Hernández', specialty: 'Nutrición', experience: '12+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Odontología (1 doctor)
    'odontologia': [
        { name: 'Dra. Marlen Méndez Batista', specialty: 'Odontología', experience: '14+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Oftalmología (2 doctors)
    'oftalmologia': [
        { name: 'Dr. José Valentín Carmona Gómez', specialty: 'Oftalmología', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Juan López Durán', specialty: 'Oftalmología', experience: '18+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Oncología (1 doctor)
    'oncologia': [
        { name: 'Dr. Rafael Díaz', specialty: 'Oncología', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Ortopedia (1 doctor)
    'ortopedia': [
        { name: 'Dr. Salvador De Jesús Medrano', specialty: 'Ortopedia', experience: '17+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Otorrinolaringología (2 doctors)
    'otorrinolaringologia': [
        { name: 'Dr. Elio Vargas', specialty: 'Otorrinolaringología', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Juan Carlos De Los Santos', specialty: 'Otorrinolaringología', experience: '18+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Pediatría (10 doctors)
    'pediatria': [
        { name: 'Dr. Alberto José García Luciano', specialty: 'Pediatría', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Eduardo Antonio Aracena Santos', specialty: 'Pediatría', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ana Grisanty Tineo Pimentel', specialty: 'Pediatría', experience: '12+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Caridad Fernández', specialty: 'Pediatría', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ileana Mercedes Morel de López', specialty: 'Pediatría', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Licelot María Mejía Duval', specialty: 'Pediatría', experience: '10+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. María Altagracia Tavárez de Peña', specialty: 'Pediatría', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Minerva Pérez Tejada', specialty: 'Pediatría', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ramona Alt. Lora Núñez', specialty: 'Pediatría', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Teresita de Jesús Mejía', specialty: 'Pediatría', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Psiquiatría (3 doctors)
    'psiquiatria': [
        { name: 'Dr. Alejandro Cruz Garrido', specialty: 'Psiquiatría', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Anderson Calderón', specialty: 'Psiquiatría', experience: '12+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Dinorah Arias Estévez', specialty: 'Psiquiatría', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Radiología (1 doctor)
    'radiologia': [
        { name: 'Dra. Carmen Valoy', specialty: 'Radiología', experience: '15+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Reumatología (1 doctor)
    'reumatologia': [
        { name: 'Dr. Juan De La Cruz', specialty: 'Reumatología', experience: '18+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Traumatología (3 doctors)
    'traumatologia': [
        { name: 'Dr. Bartolo De La Rosa', specialty: 'Traumatología', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Jairo José Ramos Méndez', specialty: 'Traumatología', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Jonathan Román', specialty: 'Traumatología', experience: '14+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Urología (2 doctors)
    'urologia': [
        { name: 'Dr. Frank Martínez Castro', specialty: 'Urología', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. José Rafael Frías Muñoz', specialty: 'Urología', experience: '19+ años', phone: '(809) 594-6161', image: null }
    ]
};

// Spanish specialty names for display
const SPECIALTY_NAMES = {
    'anestesiologia': 'Anestesiología',
    'cardiologia': 'Cardiología',
    'cirugia': 'Cirugía',
    'dermatologia': 'Dermatología',
    'endocrinologia': 'Endocrinología',
    'enfermedades_infecciosas': 'Enfermedades Infecciosas',
    'gastroenterologia': 'Gastroenterología',
    'ginecologia': 'Ginecología y Obstetricia',
    'medicina_critica': 'Medicina Crítica',
    'medicina_interna': 'Medicina Interna',
    'neurocirugia': 'Neurocirugía',
    'neurologia': 'Neurología',
    'nutricion': 'Nutrición',
    'odontologia': 'Odontología',
    'oftalmologia': 'Oftalmología',
    'oncologia': 'Oncología',
    'ortopedia': 'Ortopedia',
    'otorrinolaringologia': 'Otorrinolaringología',
    'pediatria': 'Pediatría',
    'psiquiatria': 'Psiquiatría',
    'radiologia': 'Radiología',
    'reumatologia': 'Reumatología',
    'traumatologia': 'Traumatología',
    'urologia': 'Urología'
};

// Function to render doctor cards
function renderDoctors() {
    const container = document.getElementById('departments-root');
    if (!container) return;
    
    let html = '';
    
    // Render each specialty
    for (const [specialtyKey, doctors] of Object.entries(DOCTORS_DATABASE)) {
        html += `
            <div class="specialty-section" data-specialty="${specialtyKey}">
                <h3 class="specialty-title">${SPECIALTY_NAMES[specialtyKey]} (${doctors.length})</h3>
                <div class="doctors-grid">
        `;
        
        // Render each doctor in this specialty
        doctors.forEach(doctor => {
            const photoHTML = doctor.image 
                ? `<img src="${doctor.image}" alt="${doctor.name}" class="doctor-photo">`
                : `<div class="doctor-icon"><i class="fas fa-user-md"></i></div>`;
            
            html += `
                <div class="doctor-card">
                    <div class="doctor-avatar">
                        ${photoHTML}
                    </div>
                    <div class="doctor-info">
                        <h4 class="doctor-name">${doctor.name}</h4>
                        <p class="doctor-specialty">${doctor.specialty}</p>
                        <p class="doctor-experience">${doctor.experience}</p>
                        ${doctor.bio ? `<p class="doctor-bio">${doctor.bio}</p>` : ''}
                        <div class="doctor-actions">
                            <button class="btn-action btn-schedule" onclick="scheduleWithDoctor('${doctor.name}', '${doctor.specialty}')">
                                <i class="fas fa-calendar"></i> Agendar Cita
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Function to schedule appointment
function scheduleAppointment(doctorName) {
    // Check if Nivin chat is available
    if (typeof openNivinChat === 'function') {
        openNivinChat();
        // Set initial message about scheduling
        setTimeout(() => {
            const chatInput = document.querySelector('.chat-input');
            if (chatInput) {
                chatInput.value = `Quiero agendar una cita con ${doctorName}`;
            }
        }, 500);
    } else {
        // Fallback to phone
        window.location.href = 'tel:8095946161';
    }
}

// Function to filter doctors by specialty
function filterBySpecialty(specialtyKey) {
    const sections = document.querySelectorAll('.specialty-section');
    sections.forEach(section => {
        if (specialtyKey === 'all' || section.dataset.specialty === specialtyKey) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Function to search doctors
function searchDoctors(query) {
    const searchTerm = query.toLowerCase().trim();
    const cards = document.querySelectorAll('.doctor-card');
    
    cards.forEach(card => {
        const name = card.querySelector('.doctor-name').textContent.toLowerCase();
        const specialty = card.querySelector('.doctor-specialty').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || specialty.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Get total doctor count
function getTotalDoctors() {
    let total = 0;
    for (const doctors of Object.values(DOCTORS_DATABASE)) {
        total += doctors.length;
    }
    return total;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderDoctors();
    
    // Update total count if element exists
    const countElement = document.getElementById('total-doctors');
    if (countElement) {
        countElement.textContent = getTotalDoctors();
    }
    
    // Setup search functionality
    const searchInput = document.getElementById('doctor-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => searchDoctors(e.target.value));
    }
    
    // Setup specialty filter
    const specialtyFilter = document.getElementById('specialty-filter');
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', (e) => filterBySpecialty(e.target.value));
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DOCTORS_DATABASE, SPECIALTY_NAMES, getTotalDoctors };
}

console.log(`✅ Centro Médico Universal - ${getTotalDoctors()} doctors loaded successfully`);
