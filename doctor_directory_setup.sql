-- Centro Médico Universal - Doctor Management Setup
-- Solution for existing Supabase profiles structure

-- STEP 1: Add the necessary columns
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS user_role VARCHAR(30) DEFAULT 'staff'
CHECK (user_role IN ('super_admin', 'admin', 'doctor', 'medical_assistant', 'staff'));

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS specialty VARCHAR(255);

-- STEP 2: Set you as super_admin
UPDATE profiles 
SET user_role = 'super_admin',
    specialty = 'Administración'
WHERE id = '6e8c5ea7-b94a-4f13-bec1-98dd113a668d';

-- STEP 3: Create a doctors reference table (for dropdown display)
CREATE TABLE IF NOT EXISTS doctors_directory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    doctor_name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    profile_id UUID REFERENCES profiles(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- STEP 4: Populate the doctors directory with all your doctors
INSERT INTO doctors_directory (doctor_name, specialty) VALUES
-- GINECOLOGÍA Y OBSTETRICIA
('Dra. Adalgiza Ramona Jiménez Jiménez', 'Ginecología y Obstetricia'),
('Dra. Alcia Crimely Matos Ramírez', 'Ginecología y Obstetricia'),
('Dr. César Augusto Peña Acosta', 'Ginecología y Obstetricia'),
('Dra. Emma Francisca Muñoz de Almonte', 'Ginecología y Obstetricia'),
('Dra. Andrea Henríquez', 'Ginecología y Obstetricia'),
('Dr. Enmanuel Miranda', 'Ginecología y Obstetricia'),
('Dra. Ercilia Maribel Polanco Cruz', 'Ginecología y Obstetricia'),
('Dra. Eulalia Fiordaliza Castro López', 'Ginecología y Obstetricia'),
('Dr. Francisco Javier Cedeño', 'Ginecología y Obstetricia'),
('Dra. Griselda Alt. Basora Ramírez', 'Ginecología y Obstetricia'),
('Dra. Irsa M. Montero Díaz', 'Ginecología y Obstetricia'),
('Dra. Julissa María Rojas Hernández', 'Ginecología y Obstetricia'),
('Dra. Marilelda Reyes', 'Ginecología y Obstetricia'),
('Dra. Lucía Altagracia de Jesús de Jesús', 'Ginecología y Obstetricia'),
('Dra. Ramona Jiménez', 'Ginecología y Obstetricia'),
('Dr. Reyson Edgar Pavón Fontanilla', 'Ginecología y Obstetricia'),
('Dra. Vidalva Decena Medina', 'Ginecología y Obstetricia'),
('Dra. Maribel Mejía Tapia', 'Ginecología y Obstetricia Oncológica'),
('Dra. Danely Edilia Gómez Morfa', 'Endocrinología Ginecológica e Infertilidad'),
-- CIRUGÍA
('Dr. Alecsandri Gil Zorrilla', 'Cirujano General'),
('Dra. María Magdalena Castillo Viloria', 'Cirujano Vascular'),
('Dra. María Mora', 'Cirujano General'),
('Dr. José Enrique Arzeño Schulze', 'Cirujano General'),
('Dra. Luz Esther Reyes Durán', 'Cirujana General'),
('Dr. Ramón Hamilton Capellán Cruz', 'Cirugía General, Laparoscopista'),
('Dra. Luz Mery Ramos Rosario', 'Cirujana General y Pediátrica'),
('Dr. Federico Ulices Lagrange Alcántara', 'Cirujano General'),
('Dra. Yohanna de la Cruz Fernández', 'Cirujano Maxilo Facial'),
-- PEDIATRÍA
('Dra. Ana Teresa Torres', 'Pediatra'),
('Dra. Evelyn Carolina Mariñez Ramírez', 'Pediatra Perinatóloga'),
('Dr. Androceligne Peralta', 'Pediatra Perinatólogo'),
('Dra. Carmen Isabel Sala', 'Pediatra Perinatóloga'),
('Dra. Inmaculada Concepción Corporán', 'Pediatra Perinatóloga'),
('Dra. Julia Esther Benítez Martínez', 'Pediatra Perinatóloga'),
('Dra. Gina Ángela del Carmen Hernández', 'Pediatra'),
('Dra. Josefina Altagracia Diloné', 'Pediatra Perinatóloga'),
('Dra. Libanesa Lalané de León', 'Pediatra Perinatóloga'),
('Dra. Rosa María Abreu Pérez', 'Pediatra Infectóloga'),
('Dra. Sonia Altagracia Castillo Peguero', 'Pediatra'),
('Dra. Ysa Liliana Matos Bello', 'Pediatra'),
('Dra. Anyelis Santana', 'Pediatra Dermatóloga'),
('Dr. Jorge Alejandro Velorio Wilkes', 'Pediatra Perinatólogo Intensivista'),
('Dr. Jorge Alejandro Vilorio Wilkes', 'Pediatra Perinatólogo'),
('Dra. Alexandra González Cordero', 'Pediatra Perinatóloga'),
('Dra. Kenia Ysabel González de la Rosa', 'Neumóloga Pediátrica'),
-- GASTROENTEROLOGÍA
('Dra. Bartolina Romero', 'Gastroenteróloga'),
('Dr. Staling Piña', 'Gastroenterólogo'),
('Dr. Pedro Rafael Castillo Rodríguez', 'Gastroenterología/Aparato Digestivo'),
-- ORTOPEDIA
('Dr. Ernesto Pérez Roque', 'Ortopedista'),
('Dr. Yuly Rafael Mena Santana', 'Ortopedia/Traumatología'),
('Dr. Jonathan Alberto Lara Taveras', 'Ortopedia/Traumatología'),
('Dr. César Carlos Coradín', 'Ortopedista'),
('Dr. Víctor Justiniano Rosario Suazo', 'Ortopedista'),
('Dra. Mariel Yamel Navarro Cabrera', 'Ortopeda Pediátrica y Traumatológica'),
('Dr. Enmanuel Escalante Pérez', 'Ortopeda y Traumatología'),
-- OFTALMOLOGÍA
('Dr. Francisco Méndez', 'Oftalmólogo'),
('Dra. Guillermina Méndez', 'Oftalmóloga'),
-- NEUROLOGÍA
('Dr. Francisco Pimentel Perdomo', 'Neurólogo'),
('Dra. Jenny Ferreiras', 'Neuróloga'),
-- UROLOGÍA
('Dr. Isaías Daniel Jiménez Batista', 'Urólogo'),
('Dra. Katia García Fermín', 'Uróloga'),
('Dra. Caveli García Rodríguez', 'Uróloga'),
-- CARDIOLOGÍA
('Dr. Joaquín Ramírez', 'Cardiólogo'),
('Dr. Juan Peña Núñez', 'Cardiólogo'),
('Dr. Oscar Hache Padilla', 'Cardiólogo'),
('Dr. Ramón Antonio Bido Acevedo', 'Cardiólogo'),
('Dra. Sivelis Segura Rivas', 'Cardióloga'),
-- NEUMOLOGÍA
('Dra. Mercedes Montero Bautista', 'Neumóloga'),
('Dra. Jaisy Rafalis Terrero Pérez', 'Neumóloga'),
-- OTRAS ESPECIALIDADES
('Dr. Castillo Rodríguez', 'Director Médico'),
('Dr. Manuel Antonio Castillo Rodríguez', 'Especialista en Salud Sexual y Terapia de Parejas'),
('Dr. Juan Aníbal Castillo Rodríguez', 'Anestesiólogo'),
('Dra. Carolina Mella Campo', 'Odontóloga'),
('Dra. Grilse Guzmán Núñez', 'Diabetóloga'),
('Dra. Ruth Araujo Cuevas', 'Nefróloga'),
('Dra. Wilma Tapia', 'Nutrióloga'),
('Dra. Zaida Elena Thomas Kelly', 'Dermatóloga'),
('Dr. Carlos Manuel Sánchez Morillo', 'Medicina Interna'),
('Dra. Sheila Tejeda Lorenzo', 'Intensivista'),
('Dra. Monica Camejo', 'Endocrinóloga'),
('Dr. David Enrique Cuevas Matos', 'Otorrinolaringología'),
('Dr. César Antonio Scheker Feliz', 'Otorrinolaringología'),
('Dra. Ana Karina Sánchez Carrión', 'Medicina Interna/Geriatría')
ON CONFLICT DO NOTHING;

-- Show summary
SELECT COUNT(*) as total_doctors FROM doctors_directory;

-- Update your schedule management to use doctors_directory table
-- The dropdown will now show all doctors from doctors_directory
-- When a doctor creates an account, link their profile_id to the directory
