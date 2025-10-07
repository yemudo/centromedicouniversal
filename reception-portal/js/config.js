/**
 * Centro Médico Universal - Configuration
 * All doctors and specialties from the database
 */

const CMU_CONFIG = {
    // API Endpoints
    API_BASE_URL: '/api',
    MOTIA_API_URL: 'http://localhost:3000/api',
    
    // All 95 Doctors from Database
    DOCTORS: [
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
    ],
    
    // Extract unique specialties and count doctors
    getSpecialties() {
        const specialtyCount = {};
        this.DOCTORS.forEach(doctor => {
            if (specialtyCount[doctor.specialty]) {
                specialtyCount[doctor.specialty]++;
            } else {
                specialtyCount[doctor.specialty] = 1;
            }
        });
        return Object.keys(specialtyCount)
            .sort()
            .map(specialty => ({
                name: specialty,
                count: specialtyCount[specialty]
            }));
    },
    
    // Get doctors by specialty
    getDoctorsBySpecialty(specialty) {
        return this.DOCTORS.filter(d => d.specialty === specialty);
    }
};
