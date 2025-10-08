-- =====================================================
-- REAL CENTRO MÉDICO UNIVERSAL DOCTORS
-- Source: Listado_de_Especialista_CMU__1_.pdf
-- Date: October 6, 2025
-- THIS IS THE OFFICIAL LIST - NO FAKE DATA
-- =====================================================

USE centro_medico_universal;

-- STEP 1: BACKUP OLD DATA (just in case)
CREATE TABLE IF NOT EXISTS doctores_backup_fake AS SELECT * FROM doctores;

-- STEP 2: DELETE ALL FAKE DOCTORS
DELETE FROM doctores;

-- STEP 3: RESET AUTO INCREMENT
ALTER TABLE doctores AUTO_INCREMENT = 1;

-- STEP 4: INSERT REAL DOCTORS FROM CMU DOCUMENT
-- =====================================================

-- GINECOLOGÍA Y OBSTETRICIA (20 doctors)
INSERT INTO doctores (nombre_completo, especialidad, telefono, email, horario) VALUES
('Dra. Adalgiza Ramona Jiménez Jiménez', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Alcia Crimely Matos Ramírez', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. César Augusto Peña Acosta', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Emma Francisca Muñoz de Almonte', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Andrea Henríquez', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Enmanuel Miranda', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Ercilia Maribel Polanco Cruz', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Eulalia Fiordaliza Castro López', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Francisco Javier Cedeño', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Griselda Alt. Basora Ramírez', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Irsa M. Montero Díaz', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Julissa María Rojas Hernández', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Marilelda Reyes', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Miriam Dolores Yorro Suero', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Lucía Altagracia de Jesús de Jesús', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Ramona Jiménez', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Reyson Edgar Pavón Fontanilla', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Vidalva Decena Medina', 'Ginecología y Obstetricia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Maribel Mejía Tapia', 'Ginecología y Obstetricia Oncológica', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Danely Edilia Gómez Morfa', 'Endocrinología Ginecológica e Infertilidad', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- CIRUGÍA (9 doctors)
('Dr. Alecsandri Gil Zorrilla', 'Cirugía General', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. María Magdalena Castillo Viloria', 'Cirugía Vascular', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. María Mora', 'Cirugía General', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. José Enrique Arzeno Schulze', 'Cirugía General', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Luz Esther Reyes Durán', 'Cirugía General', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Ramón Hamilton Capellán Cruz', 'Cirugía General y Laparoscopia', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Luz Mery Ramos Rosario', 'Cirugía General y Pediátrica', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Federico Ulices Lagrange Alcántara', 'Cirugía General', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Yohanna De La Cruz Fernández', 'Cirugía Maxilofacial', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- PEDIATRÍA (16 doctors)
('Dra. Ana Teresa Torres', 'Pediatría', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Evelyn Carolina Mariñez Ramírez', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Androceligne Peralta', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Carmen Isabel Sala', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Inmaculada Concepción Corporán', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Julia Esther Benítez Martínez', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Gina Ángela Del Carmen Hernández', 'Pediatría', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Josefina Altagracia Dilone', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Libanesa Lalane De León', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Rosa María Abreu Pérez', 'Pediatría e Infectología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Sonia Altagracia Castillo Peguero', 'Pediatría', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Ysa Liliana Matos Bello', 'Pediatría', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Anyelis Santana', 'Pediatría y Hematología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Jorge Alejandro Vilorio Wilkes', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Alexandra González Cordero', 'Pediatría y Perinatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Kenia Ysabel González De La Rosa', 'Neumología Pediátrica', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- GASTROENTEROLOGÍA (3 doctors)
('Dra. Bartolina Romero', 'Gastroenterología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Staling Piña', 'Gastroenterología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Pedro Rafael Castillo Rodríguez', 'Gastroenterología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- ORTOPEDIA Y TRAUMATOLOGÍA (7 doctors)
('Dr. Ernesto Pérez Roque', 'Ortopedia y Traumatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Yuly Rafael Mena Santana', 'Ortopedia y Traumatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Jonathan Alberto Lara Taveras', 'Ortopedia y Traumatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. César Carlos Coradín', 'Ortopedia y Traumatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Víctor Justiniano Rosario Suazo', 'Ortopedia y Traumatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Mariel Yamel Navarro Cabrera', 'Ortopedia Pediátrica y Traumatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Enmanuel Escalante Pérez', 'Ortopedia y Traumatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- OFTALMOLOGÍA (2 doctors)
('Dr. Francisco Méndez', 'Oftalmología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Guillermina Méndez', 'Oftalmología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- NEUROLOGÍA (2 doctors)
('Dr. Francisco Pimentel Perdomo', 'Neurología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Jenny Ferreiras', 'Neurología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- UROLOGÍA (3 doctors)
('Dr. Isaías Daniel Jiménez Batista', 'Urología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Katia García Fermín', 'Urología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Caveli García Rodríguez', 'Urología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- CARDIOLOGÍA (5 doctors)
('Dr. Joaquín Ramírez', 'Cardiología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Juan Peña Núñez', 'Cardiología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Oscar Hache Padilla', 'Cardiología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Ramón Antonio Bido Acevedo', 'Cardiología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Sivelis Segura Rivas', 'Cardiología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- NEUMOLOGÍA (2 doctors)
('Dra. Mercedes Montero Bautista', 'Neumología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Jaisy Rafalis Terrero Pérez', 'Neumología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),

-- OTRAS ESPECIALIDADES (14 doctors)
('Dra. Carolina Mella Campo', 'Odontología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Grilse Guzmán Núñez', 'Diabetología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Ruth Araujo Cuevas', 'Nefrología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Wilma Tapia', 'Nutrición', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Zaida Elena Thomas Kelly', 'Dermatología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Carlos Manuel Sánchez Morillo', 'Medicina Interna', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Sheila Tejeda Lorenzo', 'Medicina Intensiva', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Mónica Camejo', 'Endocrinología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Juan Aníbal Castillo Rodríguez', 'Anestesiología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. David Enrique Cuevas Matos', 'Otorrinolaringología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. César Antonio Scheker Feliz', 'Otorrinolaringología', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dra. Ana Karina Sánchez Carrión', 'Medicina Interna y Geriatría', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Castillo Rodríguez', 'Director Médico', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM'),
('Dr. Manuel Antonio Castillo Rodríguez', 'Salud Sexual', '', '', 'Lun-Vie: 8:00 AM - 5:00 PM');

-- =====================================================
-- COMPLETION
-- =====================================================

SELECT 'REAL CMU DOCTORS IMPORTED SUCCESSFULLY!' as status;
SELECT COUNT(*) as total_doctors FROM doctores;

