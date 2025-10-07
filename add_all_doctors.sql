-- Centro Médico Universal - Complete Doctor Database
-- Add all 95+ doctors from the website to Supabase

-- First ensure we have the user_role column if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS user_role VARCHAR(30) DEFAULT 'doctor'
CHECK (user_role IN ('super_admin', 'admin', 'doctor', 'medical_assistant', 'staff'));

-- Add specialty column if it doesn't exist
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS specialty VARCHAR(255);

-- Add full_name column if it doesn't exist
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);

-- Set you (Emilio) as super_admin using your ID (only update user_role)
UPDATE profiles 
SET user_role = 'super_admin'
WHERE id = '6e8c5ea7-b94a-4f13-bec1-98dd113a668d';

-- Add all doctors (using UPSERT to avoid duplicates)
-- Note: These are placeholder IDs - in production, you'd create real user accounts

-- GINECOLOGÍA Y OBSTETRICIA
INSERT INTO profiles (id, full_name, specialty, user_role, created_at)
VALUES 
-- Ginecología
('00000000-0001-0000-0000-000000000001', 'Dra. Adalgiza Ramona Jiménez Jiménez', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000002', 'Dra. Alcia Crimely Matos Ramírez', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000003', 'Dr. César Augusto Peña Acosta', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000004', 'Dra. Emma Francisca Muñoz de Almonte', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000005', 'Dra. Andrea Henríquez', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000006', 'Dr. Enmanuel Miranda', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000007', 'Dra. Ercilia Maribel Polanco Cruz', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000008', 'Dra. Eulalia Fiordaliza Castro López', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000009', 'Dr. Francisco Javier Cedeño', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000010', 'Dra. Griselda Alt. Basora Ramírez', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000011', 'Dra. Irsa M. Montero Díaz', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000012', 'Dra. Julissa María Rojas Hernández', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000013', 'Dra. Marilelda Reyes', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000014', 'Dra. Lucía Altagracia de Jesús de Jesús', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000015', 'Dra. Ramona Jiménez', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000016', 'Dr. Reyson Edgar Pavón Fontanilla', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000017', 'Dra. Vidalva Decena Medina', 'Ginecología y Obstetricia', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000018', 'Dra. Maribel Mejía Tapia', 'Ginecología y Obstetricia Oncológica', 'doctor', NOW()),
('00000000-0001-0000-0000-000000000019', 'Dra. Danely Edilia Gómez Morfa', 'Endocrinología Ginecológica e Infertilidad', 'doctor', NOW()),

-- CIRUGÍA
('00000000-0002-0000-0000-000000000001', 'Dr. Alecsandri Gil Zorrilla', 'Cirujano General', 'doctor', NOW()),
('00000000-0002-0000-0000-000000000002', 'Dra. María Magdalena Castillo Viloria', 'Cirujano Vascular', 'doctor', NOW()),
('00000000-0002-0000-0000-000000000003', 'Dra. María Mora', 'Cirujano General', 'doctor', NOW()),
('00000000-0002-0000-0000-000000000004', 'Dr. José Enrique Arzeño Schulze', 'Cirujano General', 'doctor', NOW()),
('00000000-0002-0000-0000-000000000005', 'Dra. Luz Esther Reyes Durán', 'Cirujana General', 'doctor', NOW()),
('00000000-0002-0000-0000-000000000006', 'Dr. Ramón Hamilton Capellán Cruz', 'Cirugía General, Laparoscopista', 'doctor', NOW()),
('00000000-0002-0000-0000-000000000007', 'Dra. Luz Mery Ramos Rosario', 'Cirujana General y Pediátrica', 'doctor', NOW()),
('00000000-0002-0000-0000-000000000008', 'Dr. Federico Ulices Lagrange Alcántara', 'Cirujano General', 'doctor', NOW()),
('00000000-0002-0000-0000-000000000009', 'Dra. Yohanna de la Cruz Fernández', 'Cirujano Maxilo Facial', 'doctor', NOW()),

-- PEDIATRÍA
('00000000-0003-0000-0000-000000000001', 'Dra. Ana Teresa Torres', 'Pediatra', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000002', 'Dra. Evelyn Carolina Mariñez Ramírez', 'Pediatra Perinatóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000003', 'Dr. Androceligne Peralta', 'Pediatra Perinatólogo', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000004', 'Dra. Carmen Isabel Sala', 'Pediatra Perinatóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000005', 'Dra. Inmaculada Concepción Corporán', 'Pediatra Perinatóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000006', 'Dra. Julia Esther Benítez Martínez', 'Pediatra Perinatóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000007', 'Dra. Gina Ángela del Carmen Hernández', 'Pediatra', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000008', 'Dra. Josefina Altagracia Diloné', 'Pediatra Perinatóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000009', 'Dra. Libanesa Lalané de León', 'Pediatra Perinatóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000010', 'Dra. Rosa María Abreu Pérez', 'Pediatra Infectóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000011', 'Dra. Sonia Altagracia Castillo Peguero', 'Pediatra', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000012', 'Dra. Ysa Liliana Matos Bello', 'Pediatra', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000013', 'Dra. Anyelis Santana', 'Pediatra Dermatóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000014', 'Dr. Jorge Alejandro Velorio Wilkes', 'Pediatra Perinatólogo Intensivista', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000015', 'Dr. Jorge Alejandro Vilorio Wilkes', 'Pediatra Perinatólogo', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000016', 'Dra. Alexandra González Cordero', 'Pediatra Perinatóloga', 'doctor', NOW()),
('00000000-0003-0000-0000-000000000017', 'Dra. Kenia Ysabel González de la Rosa', 'Neumóloga Pediátrica', 'doctor', NOW()),

-- GASTROENTEROLOGÍA
('00000000-0004-0000-0000-000000000001', 'Dra. Bartolina Romero', 'Gastroenteróloga', 'doctor', NOW()),
('00000000-0004-0000-0000-000000000002', 'Dr. Staling Piña', 'Gastroenterólogo', 'doctor', NOW()),
('00000000-0004-0000-0000-000000000003', 'Dr. Pedro Rafael Castillo Rodríguez', 'Gastroenterología/Aparato Digestivo', 'doctor', NOW()),

-- ORTOPEDIA
('00000000-0005-0000-0000-000000000001', 'Dr. Ernesto Pérez Roque', 'Ortopedista', 'doctor', NOW()),
('00000000-0005-0000-0000-000000000002', 'Dr. Yuly Rafael Mena Santana', 'Ortopedia/Traumatología', 'doctor', NOW()),
('00000000-0005-0000-0000-000000000003', 'Dr. Jonathan Alberto Lara Taveras', 'Ortopedia/Traumatología', 'doctor', NOW()),
('00000000-0005-0000-0000-000000000004', 'Dr. César Carlos Coradín', 'Ortopedista', 'doctor', NOW()),
('00000000-0005-0000-0000-000000000005', 'Dr. Víctor Justiniano Rosario Suazo', 'Ortopedista', 'doctor', NOW()),
('00000000-0005-0000-0000-000000000006', 'Dra. Mariel Yamel Navarro Cabrera', 'Ortopeda Pediátrica y Traumatológica', 'doctor', NOW()),
('00000000-0005-0000-0000-000000000007', 'Dr. Enmanuel Escalante Pérez', 'Ortopeda y Traumatología', 'doctor', NOW()),

-- OFTALMOLOGÍA
('00000000-0006-0000-0000-000000000001', 'Dr. Francisco Méndez', 'Oftalmólogo', 'doctor', NOW()),
('00000000-0006-0000-0000-000000000002', 'Dra. Guillermina Méndez', 'Oftalmóloga', 'doctor', NOW()),

-- NEUROLOGÍA
('00000000-0007-0000-0000-000000000001', 'Dr. Francisco Pimentel Perdomo', 'Neurólogo', 'doctor', NOW()),
('00000000-0007-0000-0000-000000000002', 'Dra. Jenny Ferreiras', 'Neuróloga', 'doctor', NOW()),

-- UROLOGÍA
('00000000-0008-0000-0000-000000000001', 'Dr. Isaías Daniel Jiménez Batista', 'Urólogo', 'doctor', NOW()),
('00000000-0008-0000-0000-000000000002', 'Dra. Katia García Fermín', 'Uróloga', 'doctor', NOW()),
('00000000-0008-0000-0000-000000000003', 'Dra. Caveli García Rodríguez', 'Uróloga', 'doctor', NOW()),

-- CARDIOLOGÍA
('00000000-0009-0000-0000-000000000001', 'Dr. Joaquín Ramírez', 'Cardiólogo', 'doctor', NOW()),
('00000000-0009-0000-0000-000000000002', 'Dr. Juan Peña Núñez', 'Cardiólogo', 'doctor', NOW()),
('00000000-0009-0000-0000-000000000003', 'Dr. Oscar Hache Padilla', 'Cardiólogo', 'doctor', NOW()),
('00000000-0009-0000-0000-000000000004', 'Dr. Ramón Antonio Bido Acevedo', 'Cardiólogo', 'doctor', NOW()),
('00000000-0009-0000-0000-000000000005', 'Dra. Sivelis Segura Rivas', 'Cardióloga', 'doctor', NOW()),

-- NEUMOLOGÍA
('00000000-0010-0000-0000-000000000001', 'Dra. Mercedes Montero Bautista', 'Neumóloga', 'doctor', NOW()),
('00000000-0010-0000-0000-000000000002', 'Dra. Jaisy Rafalis Terrero Pérez', 'Neumóloga', 'doctor', NOW()),

-- OTRAS ESPECIALIDADES
('00000000-0011-0000-0000-000000000001', 'Dr. Castillo Rodríguez', 'Director Médico', 'admin', NOW()),
('00000000-0011-0000-0000-000000000002', 'Dr. Manuel Antonio Castillo Rodríguez', 'Especialista en Salud Sexual y Terapia de Parejas', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000003', 'Dr. Juan Aníbal Castillo Rodríguez', 'Anestesiólogo', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000004', 'Dra. Carolina Mella Campo', 'Odontóloga', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000005', 'Dra. Grilse Guzmán Núñez', 'Diabetóloga', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000006', 'Dra. Ruth Araujo Cuevas', 'Nefróloga', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000007', 'Dra. Wilma Tapia', 'Nutrióloga', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000008', 'Dra. Zaida Elena Thomas Kelly', 'Dermatóloga', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000009', 'Dr. Carlos Manuel Sánchez Morillo', 'Medicina Interna', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000010', 'Dra. Sheila Tejeda Lorenzo', 'Intensivista', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000011', 'Dra. Monica Camejo', 'Endocrinóloga', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000012', 'Dr. David Enrique Cuevas Matos', 'Otorrinolaringología', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000013', 'Dr. César Antonio Scheker Feliz', 'Otorrinolaringología', 'doctor', NOW()),
('00000000-0011-0000-0000-000000000014', 'Dra. Ana Karina Sánchez Carrión', 'Medicina Interna/Geriatría', 'doctor', NOW())
ON CONFLICT (id) DO UPDATE SET 
    full_name = EXCLUDED.full_name,
    specialty = EXCLUDED.specialty,
    user_role = EXCLUDED.user_role;

-- Add some Medical Assistants for testing
INSERT INTO profiles (id, full_name, specialty, user_role, created_at)
VALUES 
('00000000-0012-0000-0000-000000000001', 'MA. Carmen Rosa', 'Asistente Médico - Ginecología', 'medical_assistant', NOW()),
('00000000-0012-0000-0000-000000000002', 'MA. José Luis', 'Asistente Médico - Pediatría', 'medical_assistant', NOW()),
('00000000-0012-0000-0000-000000000003', 'MA. María Santos', 'Asistente Médico - Medicina General', 'medical_assistant', NOW())
ON CONFLICT (id) DO UPDATE SET 
    full_name = EXCLUDED.full_name,
    specialty = EXCLUDED.specialty,
    user_role = EXCLUDED.user_role;

-- Show summary
SELECT user_role, COUNT(*) as count 
FROM profiles 
GROUP BY user_role 
ORDER BY count DESC;

-- Show all doctors
SELECT id, user_role, specialty 
FROM profiles 
WHERE user_role IN ('doctor', 'admin', 'super_admin')
ORDER BY user_role DESC
LIMIT 20;
