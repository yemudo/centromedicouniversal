/**
 * Centro Médico Universal - Updated Doctors Database with Photo Integration
 * Complete doctors database with proper image paths for deployment
 */

// IMAGES SETUP INSTRUCTIONS:
// 1. Only use REAL doctor photos - NO fake/placeholder images
// 2. Doctors without real photos will show professional FontAwesome icons
// 3. Image size: 300x300px minimum, square aspect ratio
// 4. Format: JPG or PNG

// DOCTORS WITH REAL PHOTOS ONLY:
// - Dra. Vidalva Decena Medina (CENTER) - HAS REAL PHOTO ⭐ 
// - Dr. Manuel Antonio Castillo Rodríguez (RIGHT) - HAS REAL PHOTO ⭐
// - All others use professional medical icons (NO fake photos)

// Complete doctors database from Centro Médico Universal
const DOCTORS_DATABASE = {
    // Ginecología
    'ginecologia': [
        { name: 'Dra. Adalgiza Ramona Jiménez Jiménez', specialty: 'Ginecología y Obstetricia', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Alcia Crimely Matos Ramírez', specialty: 'Ginecología y Obstetricia', experience: '12+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. César Augusto Peña Acosta', specialty: 'Ginecología y Obstetricia', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Emma Francisca Muñoz de Almonte', specialty: 'Ginecología y Obstetricia', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Andrea Henríquez', specialty: 'Ginecología y Obstetricia', experience: '10+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Enmanuel Miranda', specialty: 'Ginecología y Obstetricia', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ercilia Maribel Polanco Cruz', specialty: 'Ginecología y Obstetricia', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Eulalia Fiordaliza Castro López', specialty: 'Ginecología y Obstetricia', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Francisco Javier Cedeño', specialty: 'Ginecología y Obstetricia', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Griselda Alt. Basora Ramírez', specialty: 'Ginecología y Obstetricia', experience: '13+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Irsa M. Montero Díaz', specialty: 'Ginecología y Obstetricia', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Julissa María Rojas Hernández', specialty: 'Ginecología y Obstetricia', experience: '11+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Marilelda Reyes', specialty: 'Ginecología y Obstetricia', experience: '15+ años', phone: '(809) 594-6161', image: null },

        { name: 'Dra. Lucía Altagracia de Jesús de Jesús', specialty: 'Ginecología y Obstetricia', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ramona Jiménez', specialty: 'Ginecología y Obstetricia', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Reyson Edgar Pavón Fontanilla', specialty: 'Ginecología y Obstetricia', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { 
            name: 'Dra. Vidalva Decena Medina', 
            specialty: 'Ginecología y Obstetricia', 
            experience: '25+ años', 
            phone: '(809) 594-6161', 
            image: 'images/doctors/vidalva-decena-medina.jpg', // ⭐ REAL PHOTO (center of uploaded image)
            bio: 'Especialista en ginecología dedicada a la atención integral de la salud femenina.' 
        },
        { name: 'Dra. Maribel Mejía Tapia', specialty: 'Ginecología y Obstetricia Oncológica', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Danely Edilia Gómez Morfa', specialty: 'Endocrinología Ginecológica e Infertilidad', experience: '18+ años', phone: '(809) 594-6161', image: null }
    ],
    // Cirugía
    'cirugia': [
        { name: 'Dr. Alecsandri Gil Zorrilla', specialty: 'Cirujano General', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. María Magdalena Castillo Viloria', specialty: 'Cirujano Vascular', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. María Mora', specialty: 'Cirujano General', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. José Enrique Arzeño Schulze', specialty: 'Cirujano General', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Luz Esther Reyes Durán', specialty: 'Cirujana General', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Ramón Hamilton Capellán Cruz', specialty: 'Cirugía General, Laparoscopista', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Luz Mery Ramos Rosario', specialty: 'Cirujana General y Pediátrica', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Federico Ulices Lagrange Alcántara', specialty: 'Cirujano General', experience: '21+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Yohanna de la Cruz Fernández', specialty: 'Cirujano Maxilo Facial', experience: '14+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Pediatría
    'pediatria': [
        { name: 'Dra. Ana Teresa Torres', specialty: 'Pediatra', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Evelyn Carolina Mariñez Ramírez', specialty: 'Pediatra Perinatóloga', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Androceligne Peralta', specialty: 'Pediatra Perinatólogo', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Carmen Isabel Sala', specialty: 'Pediatra Perinatóloga', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Inmaculada Concepción Corporán', specialty: 'Pediatra Perinatóloga', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Julia Esther Benítez Martínez', specialty: 'Pediatra Perinatóloga', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Gina Ángela del Carmen Hernández', specialty: 'Pediatra', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Josefina Altagracia Diloné', specialty: 'Pediatra Perinatóloga', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Libanesa Lalané de León', specialty: 'Pediatra Perinatóloga', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Rosa María Abreu Pérez', specialty: 'Pediatra Infectóloga', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Sonia Altagracia Castillo Peguero', specialty: 'Pediatra', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ysa Liliana Matos Bello', specialty: 'Pediatra', experience: '13+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Anyelis Santana', specialty: 'Pediatra Dermatóloga', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Jorge Alejandro Velorio Wilkes', specialty: 'Pediatra Perinatólogo Intensivista', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Jorge Alejandro Vilorio Wilkes', specialty: 'Pediatra Perinatólogo', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Alexandra González Cordero', specialty: 'Pediatra Perinatóloga', experience: '14+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Kenia Ysabel González de la Rosa', specialty: 'Neumóloga Pediátrica', experience: '17+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Gastroenterología
    'gastroenterologia': [
        { name: 'Dra. Bartolina Romero', specialty: 'Gastroenteróloga', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Staling Piña', specialty: 'Gastroenterólogo', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Pedro Rafael Castillo Rodríguez', specialty: 'Gastroenterología/Aparato Digestivo', experience: '22+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Ortopedia
    'ortopedia': [
        { name: 'Dr. Ernesto Pérez Roque', specialty: 'Ortopedista', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Yuly Rafael Mena Santana', specialty: 'Ortopedia/Traumatología', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Jonathan Alberto Lara Taveras', specialty: 'Ortopedia/Traumatología', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. César Carlos Coradín', specialty: 'Ortopedista', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Víctor Justiniano Rosario Suazo', specialty: 'Ortopedista', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Mariel Yamel Navarro Cabrera', specialty: 'Ortopeda Pediátrica y Traumatológica', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Enmanuel Escalante Pérez', specialty: 'Ortopeda y Traumatología', experience: '14+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Oftalmología
    'oftalmologia': [
        { name: 'Dr. Francisco Méndez', specialty: 'Oftalmólogo', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Guillermina Méndez', specialty: 'Oftalmóloga', experience: '20+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Neurología
    'neurologia': [
        { name: 'Dr. Francisco Pimentel Perdomo', specialty: 'Neurólogo', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Jenny Ferreiras', specialty: 'Neuróloga', experience: '15+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Urología
    'urologia': [
        { name: 'Dr. Isaías Daniel Jiménez Batista', specialty: 'Urólogo', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Katia García Fermín', specialty: 'Uróloga', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Caveli García Rodríguez', specialty: 'Uróloga', experience: '14+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Cardiología
    'cardiologia': [
        { name: 'Dr. Joaquín Ramírez', specialty: 'Cardiólogo', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Juan Peña Núñez', specialty: 'Cardiólogo', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Oscar Hache Padilla', specialty: 'Cardiólogo', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Ramón Antonio Bido Acevedo', specialty: 'Cardiólogo', experience: '21+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Sivelis Segura Rivas', specialty: 'Cardióloga', experience: '17+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Neumología
    'neumologia': [
        { name: 'Dra. Mercedes Montero Bautista', specialty: 'Neumóloga', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Jaisy Rafalis Terrero Pérez', specialty: 'Neumóloga', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ],
    
    // Otras Especialidades (Featured doctors with actual photos)
    'otras_especialidades': [
        { 
            name: 'Dr. Castillo Rodríguez', 
            specialty: 'Director Médico', 
            experience: '25+ años', 
            phone: '(809) 594-6161', 
            image: null, // Uses professional icon (no photo - this is NOT Antonio)
            bio: 'Director Médico del Centro con más de 25 años de experiencia en medicina.' 
        },
        { 
            name: 'Dr. Manuel Antonio Castillo Rodríguez', 
            specialty: 'Especialista en Salud Sexual y Terapia de Parejas', 
            experience: '25+ años', 
            phone: '(809) 594-6161', 
            image: 'images/doctors/manuel-antonio-castillo.jpg', // ⭐ ACTUAL PHOTO AVAILABLE
            bio: 'Especialista dominicano con más de 25 años de experiencia en ginecología, sexualidad humana y terapia de parejas. Autor de investigaciones sobre vaginismo y abuso sexual.' 
        },
        { name: 'Dra. Carolina Mella Campo', specialty: 'Odontóloga', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Grilse Guzmán Núñez', specialty: 'Diabetóloga', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ruth Araujo Cuevas', specialty: 'Nefróloga', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Wilma Tapia', specialty: 'Nutrióloga', experience: '16+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Zaida Elena Thomas Kelly', specialty: 'Dermatóloga', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Carlos Manuel Sánchez Morillo', specialty: 'Medicina Interna', experience: '20+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Sheila Tejeda Lorenzo', specialty: 'Intensivista', experience: '15+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Monica Camejo', specialty: 'Endocrinóloga', experience: '17+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. Juan Aníbal Castillo Rodríguez', specialty: 'Anestesiólogo', experience: '22+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. David Enrique Cuevas Matos', specialty: 'Otorrinolaringología', experience: '19+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dr. César Antonio Scheker Feliz', specialty: 'Otorrinolaringología', experience: '18+ años', phone: '(809) 594-6161', image: null },
        { name: 'Dra. Ana Karina Sánchez Carrión', specialty: 'Medicina Interna/Geriatría', experience: '16+ años', phone: '(809) 594-6161', image: null }
    ]
};

// Specialty configurations with icons and descriptions
const SPECIALTY_CONFIG = {
    'ginecologia': {
        title: 'Ginecología y Obstetricia',
        icon: 'fa-venus',
        description: 'Atención integral de la salud femenina, embarazo y parto',
        color: '#E91E63'
    },
    'cirugia': {
        title: 'Cirugía',
        icon: 'fa-user-md',
        description: 'Procedimientos quirúrgicos especializados',
        color: '#F44336'
    },
    'pediatria': {
        title: 'Pediatría',
        icon: 'fa-baby',
        description: 'Cuidado médico especializado para niños',
        color: '#2196F3'
    },
    'gastroenterologia': {
        title: 'Gastroenterología',
        icon: 'fa-stomach',
        description: 'Especialistas en sistema digestivo',
        color: '#FF9800'
    },
    'ortopedia': {
        title: 'Ortopedia y Traumatología',
        icon: 'fa-bone',
        description: 'Tratamiento de huesos, músculos y articulaciones',
        color: '#607D8B'
    },
    'oftalmologia': {
        title: 'Oftalmología',
        icon: 'fa-eye',
        description: 'Cuidado especializado de la salud visual',
        color: '#009688'
    },
    'neurologia': {
        title: 'Neurología',
        icon: 'fa-brain',
        description: 'Especialistas en el sistema nervioso',
        color: '#9C27B0'
    },
    'urologia': {
        title: 'Urología',
        icon: 'fa-kidneys',
        description: 'Especialistas en sistema urinario',
        color: '#3F51B5'
    },
    'cardiologia': {
        title: 'Cardiología',
        icon: 'fa-heartbeat',
        description: 'Cuidado del corazón y sistema cardiovascular',
        color: '#E53935'
    },
    'neumologia': {
        title: 'Neumología',
        icon: 'fa-lungs',
        description: 'Especialistas en sistema respiratorio',
        color: '#00BCD4'
    },
    'otras_especialidades': {
        title: 'Otras Especialidades',
        icon: 'fa-stethoscope',
        description: 'Diversas especialidades médicas',
        color: '#4CAF50'
    }
};

// Main rendering functions
class DoctorsRenderer {
    constructor() {
        this.searchInput = null;
        this.filterButtons = null;
        this.departmentsRoot = null;
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupElements();
            this.renderFilterButtons();
            this.renderDoctors();
            this.setupEventListeners();
            this.populateAppointmentForm();
        });
    }
    
    setupElements() {
        this.searchInput = document.querySelector('.search-box input');
        this.filterButtons = document.querySelector('.filter-controls');
        this.departmentsRoot = document.getElementById('departments-root');
    }
    
    renderFilterButtons() {
        if (!this.filterButtons) return;
        
        const buttons = [
            { key: 'all', label: 'Todos los Especialistas', count: this.getTotalDoctorsCount() }
        ];
        
        // Add specialty buttons
        Object.entries(SPECIALTY_CONFIG).forEach(([key, config]) => {
            const count = DOCTORS_DATABASE[key]?.length || 0;
            if (count > 0) {
                buttons.push({
                    key: key,
                    label: config.title,
                    count: count
                });
            }
        });
        
        this.filterButtons.innerHTML = buttons.map(btn => `
            <button class="filter-btn ${btn.key === 'all' ? 'active' : ''}" data-filter="${btn.key}">
                ${btn.label} (${btn.count})
            </button>
        `).join('');
    }
    
    getTotalDoctorsCount() {
        return Object.values(DOCTORS_DATABASE).reduce((total, doctors) => total + doctors.length, 0);
    }
    
    renderDoctors() {
        if (!this.departmentsRoot) return;
        
        let doctorsToShow = this.getFilteredDoctors();
        
        if (doctorsToShow.length === 0) {
            this.departmentsRoot.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No se encontraron médicos que coincidan con su búsqueda.</p>
                </div>
            `;
            return;
        }
        
        // Group doctors by specialty if showing all, otherwise show as single group
        if (this.currentFilter === 'all') {
            this.renderBySpecialties(doctorsToShow);
        } else {
            this.renderSingleSpecialty(doctorsToShow);
        }
    }
    
    renderBySpecialties(doctorsData) {
        const html = Object.entries(doctorsData).map(([specialtyKey, doctors]) => {
            const config = SPECIALTY_CONFIG[specialtyKey];
            if (!config || doctors.length === 0) return '';
            
            return `
                <div class="department-section">
                    <div class="department-header">
                        <h2>
                            <i class="fas ${config.icon}" style="color: ${config.color}; margin-right: 0.5rem;"></i>
                            ${config.title}
                        </h2>
                        <p>${config.description} • ${doctors.length} especialista${doctors.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div class="doctors-page-grid">
                        ${doctors.map(doctor => this.renderDoctorCard(doctor)).join('')}
                    </div>
                </div>
            `;
        }).filter(html => html).join('');
        
        this.departmentsRoot.innerHTML = html;
    }
    
    renderSingleSpecialty(doctorsData) {
        const specialtyKey = this.currentFilter;
        const doctors = doctorsData[specialtyKey] || [];
        const config = SPECIALTY_CONFIG[specialtyKey];
        
        if (!config) return;
        
        const html = `
            <div class="department-section">
                <div class="department-header">
                    <h2>
                        <i class="fas ${config.icon}" style="color: ${config.color}; margin-right: 0.5rem;"></i>
                        ${config.title}
                    </h2>
                    <p>${config.description} • ${doctors.length} especialista${doctors.length !== 1 ? 's' : ''}</p>
                </div>
                <div class="doctors-page-grid">
                    ${doctors.map(doctor => this.renderDoctorCard(doctor)).join('')}
                </div>
            </div>
        `;
        
        this.departmentsRoot.innerHTML = html;
    }

    renderDoctorCard(doctor) {
        // Generate professional initials from doctor's name
        const getInitials = (name) => {
            // Remove titles (Dr., Dra.)
            const cleanName = name.replace(/^(Dr\.|Dra\.)\s*/i, '');
            const parts = cleanName.split(' ');
            
            // Get first and last name initials
            if (parts.length >= 2) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            }
            return parts[0].substring(0, 2).toUpperCase();
        };
        
        // Generate consistent gradient based on name (for consistent colors per doctor)
        const getGradientColors = (name) => {
            const gradients = [
                ['#667eea', '#764ba2'], // Purple gradient
                ['#f093fb', '#f5576c'], // Pink gradient
                ['#4facfe', '#00f2fe'], // Blue gradient
                ['#43e97b', '#38f9d7'], // Green gradient
                ['#fa709a', '#fee140'], // Sunset gradient
                ['#30cfd0', '#330867'], // Ocean gradient
                ['#a8edea', '#fed6e3'], // Soft gradient
                ['#ff9a9e', '#fecfef'], // Rose gradient
                ['#667eea', '#764ba2'], // Violet gradient
                ['#fbc2eb', '#a6c1ee'], // Gentle gradient
            ];
            
            // Use character code sum to consistently select gradient
            let sum = 0;
            for (let i = 0; i < name.length; i++) {
                sum += name.charCodeAt(i);
            }
            return gradients[sum % gradients.length];
        };
        
        // Professional initials-based avatar for doctors without photos
        const imageHtml = (doctor.image && doctor.image !== null)
            ? `<img src="${doctor.image}" alt="${doctor.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'doctor-avatar-professional\\' style=\\'background: linear-gradient(135deg, ${getGradientColors(doctor.name)[0]}, ${getGradientColors(doctor.name)[1]});\\'>
<span class=\\'doctor-initials\\'>${getInitials(doctor.name)}</span></div>';">`
            : `<div class="doctor-avatar-professional" style="background: linear-gradient(135deg, ${getGradientColors(doctor.name)[0]}, ${getGradientColors(doctor.name)[1]});">
                <span class="doctor-initials">${getInitials(doctor.name)}</span>
              </div>`;
            
        const bioHtml = doctor.bio 
            ? `<p class="doctor-bio">${doctor.bio}</p>`
            : '';
            
        return `
            <div class="doctor-card-detailed">
                <div class="doctor-image">
                    ${imageHtml}
                </div>
                <div class="doctor-info">
                    <h3 class="doctor-name">${doctor.name}</h3>
                    <span class="doctor-specialty">${doctor.specialty}</span>
                    ${bioHtml}
                    
                    <div class="doctor-details">
                        <div class="doctor-detail">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Experiencia: ${doctor.experience}</span>
                        </div>
                        <div class="doctor-detail">
                            <i class="fas fa-phone"></i>
                            <span>${doctor.phone}</span>
                        </div>
                        <div class="doctor-detail">
                            <i class="fas fa-clock"></i>
                            <span>Disponible para citas</span>
                        </div>
                    </div>
                </div>
                
                <div class="doctor-actions">
                    <a href="/booking?doctor=${encodeURIComponent(doctor.name)}&specialty=${encodeURIComponent(doctor.specialty)}" class="appointment-btn">
                        <i class="fas fa-calendar-check"></i> Agendar Cita
                    </a>
                    <a href="tel:${doctor.phone}" class="profile-btn">
                        <i class="fas fa-phone"></i> Llamar
                    </a>
                </div>
            </div>
        `;
    }
    
    getFilteredDoctors() {
        let result = {};
        
        if (this.currentFilter === 'all') {
            // Show all specialties
            Object.entries(DOCTORS_DATABASE).forEach(([specialtyKey, doctors]) => {
                const filtered = this.filterDoctorsBySearch(doctors);
                if (filtered.length > 0) {
                    result[specialtyKey] = filtered;
                }
            });
        } else {
            // Show specific specialty
            const doctors = DOCTORS_DATABASE[this.currentFilter] || [];
            const filtered = this.filterDoctorsBySearch(doctors);
            if (filtered.length > 0) {
                result[this.currentFilter] = filtered;
            }
        }
        
        return result;
    }
    
    filterDoctorsBySearch(doctors) {
        if (!this.searchTerm) return doctors;
        
        const searchLower = this.searchTerm.toLowerCase();
        return doctors.filter(doctor => 
            doctor.name.toLowerCase().includes(searchLower) ||
            doctor.specialty.toLowerCase().includes(searchLower)
        );
    }
    
    setupEventListeners() {
        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.trim();
                this.renderDoctors();
            });
        }
        
        // Filter buttons
        if (this.filterButtons) {
            this.filterButtons.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    // Update active filter
                    this.filterButtons.querySelectorAll('.filter-btn').forEach(btn => 
                        btn.classList.remove('active')
                    );
                    e.target.classList.add('active');
                    
                    // Update current filter
                    this.currentFilter = e.target.dataset.filter;
                    this.renderDoctors();
                }
            });
        }
    }
    
    populateAppointmentForm() {
        // Populate specialty dropdown
        const specialtySelect = document.getElementById('appointment-specialty');
        const doctorSelect = document.getElementById('appointment-doctor');
        
        if (specialtySelect) {
            const specialtyOptions = Object.entries(SPECIALTY_CONFIG).map(([key, config]) => 
                `<option value="${key}">${config.title}</option>`
            ).join('');
            
            specialtySelect.innerHTML = `
                <option value="" disabled selected>Seleccione especialidad</option>
                ${specialtyOptions}
            `;
            
            // Handle specialty change
            specialtySelect.addEventListener('change', (e) => {
                const selectedSpecialty = e.target.value;
                const doctors = DOCTORS_DATABASE[selectedSpecialty] || [];
                
                if (doctorSelect) {
                    const doctorOptions = doctors.map(doctor => 
                        `<option value="${doctor.name}">${doctor.name}</option>`
                    ).join('');
                    
                    doctorSelect.innerHTML = `
                        <option value="" disabled selected>Seleccione doctor</option>
                        ${doctorOptions}
                    `;
                }
            });
        }
    }
    
    // Utility methods
    getAllDoctors() {
        return Object.values(DOCTORS_DATABASE).flat();
    }
    
    getDoctorsBySpecialty(specialty) {
        return DOCTORS_DATABASE[specialty] || [];
    }
    
    searchDoctors(query) {
        const searchLower = query.toLowerCase();
        return this.getAllDoctors().filter(doctor => 
            doctor.name.toLowerCase().includes(searchLower) ||
            doctor.specialty.toLowerCase().includes(searchLower)
        );
    }
}

// Initialize the doctors renderer
const doctorsRenderer = new DoctorsRenderer();

// Export for global access
window.DoctorsRenderer = DoctorsRenderer;
window.DOCTORS_DATABASE = DOCTORS_DATABASE;
window.SPECIALTY_CONFIG = SPECIALTY_CONFIG;
