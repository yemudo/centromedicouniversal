-- Centro Médico Universal - Simple Doctor Setup
-- Works with existing Supabase profiles table structure

-- First ensure we have the required columns
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS user_role VARCHAR(30) DEFAULT 'doctor'
CHECK (user_role IN ('super_admin', 'admin', 'doctor', 'medical_assistant', 'staff'));

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS specialty VARCHAR(255);

-- Set you (Emilio) as super_admin
UPDATE profiles 
SET user_role = 'super_admin'
WHERE id = '6e8c5ea7-b94a-4f13-bec1-98dd113a668d';

-- For testing, let's just update existing profiles to have doctor roles
-- This way we don't need to create new users with all required fields
UPDATE profiles
SET user_role = 'doctor', 
    specialty = CASE 
        WHEN id = '6e8c5ea7-b94a-4f13-bec1-98dd113a668d' THEN 'Super Admin'
        ELSE 'Medicina General'
    END
WHERE id IS NOT NULL;

-- Show current profiles
SELECT id, first_name, last_name, user_role, specialty 
FROM profiles
ORDER BY user_role DESC, first_name;

-- Instructions for adding real doctors:
-- 1. Create user accounts in Supabase Authentication
-- 2. They will automatically get profiles created
-- 3. Then update their specialty and role:
-- UPDATE profiles SET user_role = 'doctor', specialty = 'Cardiología' WHERE id = 'doctor-uuid';
