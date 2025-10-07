-- NIVIN EMR - User Management System Database Schema
-- Centro Médico Universal
-- Creates tables for secure user management

-- ==================================================
-- USERS TABLE
-- ==================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `role` ENUM('super_admin', 'admin', 'doctor', 'nurse', 'receptionist', 'billing') NOT NULL DEFAULT 'receptionist',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` DATETIME NULL,
  `failed_login_attempts` INT(11) NOT NULL DEFAULT 0,
  `locked_until` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`),
  INDEX `idx_role` (`role`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- USER PERMISSIONS TABLE
-- ==================================================
CREATE TABLE IF NOT EXISTS `user_permissions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `permission` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_permission` (`user_id`, `permission`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_permission` (`permission`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- USER ACTIVITY LOG TABLE
-- ==================================================
CREATE TABLE IF NOT EXISTS `user_activity_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_action` (`action`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================================================
-- INSERT SUPER ADMIN (MANUEL CASTILLO)
-- ==================================================
-- Password: Nivin@CMU2025!
-- This will be hashed on first login
INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `email`, `role`, `is_active`, `created_at`) 
VALUES (
  1,
  'mcastillo',
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Temporary hash, will be updated on first login
  'Manuel Castillo',
  'nuelcastillo@centromedicouniversal.com',
  'super_admin',
  1,
  NOW()
) ON DUPLICATE KEY UPDATE
  `full_name` = 'Manuel Castillo',
  `email` = 'nuelcastillo@centromedicouniversal.com',
  `role` = 'super_admin',
  `is_active` = 1;

-- ==================================================
-- SUPER ADMIN PERMISSIONS (ALL)
-- ==================================================
INSERT INTO `user_permissions` (`user_id`, `permission`) 
VALUES 
  (1, '*')
ON DUPLICATE KEY UPDATE `permission` = '*';

-- ==================================================
-- SAMPLE ROLES AND PERMISSIONS
-- ==================================================
-- These are examples - Super Admin can modify via UI

-- Example: Admin User
-- INSERT INTO `users` (`username`, `password`, `full_name`, `email`, `role`, `is_active`) 
-- VALUES ('admin', PASSWORD('AdminPass123!'), 'Administrator', 'admin@centromedicouniversal.com', 'admin', 1);

-- Example: Doctor User
-- INSERT INTO `users` (`username`, `password`, `full_name`, `email`, `role`, `is_active`) 
-- VALUES ('drsmith', PASSWORD('DoctorPass123!'), 'Dr. John Smith', 'drsmith@centromedicouniversal.com', 'doctor', 1);

-- Example: Receptionist User
-- INSERT INTO `users` (`username`, `password`, `full_name`, `email`, `role`, `is_active`) 
-- VALUES ('recepcion', PASSWORD('Reception123!'), 'Recepcionista CMU', 'recepcion@centromedicouniversal.com', 'receptionist', 1);

-- ==================================================
-- AVAILABLE PERMISSIONS LIST (For Reference)
-- ==================================================
/*
SYSTEM PERMISSIONS:
- manage_users: Create, edit, delete users
- view_reports: Access system reports
- manage_schedule: Create and modify schedules
- manage_patients: Full patient management
- view_patients: Read-only patient access
- manage_appointments: Create, edit, cancel appointments
- view_appointments: View appointment calendar
- check_in_patients: Patient check-in/check-out
- write_notes: Create clinical notes
- prescribe: Write prescriptions
- view_labs: View lab results
- update_vitals: Record vital signs
- manage_tasks: Manage tasks and assignments
- view_billing: View billing information
- process_payments: Process patient payments
- generate_invoices: Create invoices
- manage_calls: Handle phone calls

SUPER ADMIN ONLY:
- *: All permissions (wildcard)
*/

-- ==================================================
-- SECURITY INDEXES
-- ==================================================
-- These indexes improve query performance and security

-- Index for login attempts tracking
ALTER TABLE `users` 
ADD INDEX `idx_failed_attempts` (`failed_login_attempts`, `locked_until`);

-- Index for activity log searches
ALTER TABLE `user_activity_log`
ADD INDEX `idx_user_action_date` (`user_id`, `action`, `created_at`);

-- ==================================================
-- COMPLETION MESSAGE
-- ==================================================
SELECT 'User Management System Database Schema Created Successfully!' AS Status,
       'Super Admin: mcastillo' AS Username,
       'Email: nuelcastillo@centromedicouniversal.com' AS Email,
       'Role: super_admin' AS Role,
       'You can now log in and create additional users!' AS NextStep;
