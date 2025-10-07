-- Add doctors to Centro Médico Universal
-- First, we need to create users in Supabase Auth, then add their profiles

-- Since we can't directly create auth.users from SQL, you need to:
-- 1. Go to Authentication > Users in Supabase
-- 2. Create these users with these emails:
--    - drcastillo@centromedicouniversal.com (Dr. Castillo Rodríguez)
--    - drjuan@centromedicouniversal.com (Dr. Juan Aníbal Castillo)
--    - dravidalva@centromedicouniversal.com (Dra. Vidalva Decena Medina)
--    - drmanuel@centromedicouniversal.com (Dr. Manuel Antonio Castillo)

-- After creating the users in Authentication, get their IDs and run this:
-- Replace the UUIDs below with the actual IDs from the created users

/*
UPDATE profiles 
SET 
    user_role = 'doctor',
    department = 'Medicina General',
    status = 'active'
WHERE email IN (
    'drcastillo@centromedicouniversal.com',
    'drjuan@centromedicouniversal.com',
    'drmanuel@centromedicouniversal.com'
);

UPDATE profiles 
SET 
    user_role = 'doctor',
    department = 'Ginecología',
    status = 'active'
WHERE email = 'dravidalva@centromedicouniversal.com';
*/

-- Alternative: If you want to quickly test, you can update existing users to be doctors temporarily
-- This will make Emilio also appear as a doctor for testing:

UPDATE profiles 
SET 
    department = 'Administración'
WHERE id = '6e8c5ea7-b94a-4f13-bec1-98dd113a668d';

-- Quick solution: Create test doctors without auth users (for testing only)
-- These won't be able to login but will appear in the dropdown

INSERT INTO profiles (id, username, first_name, last_name, email, user_role, department, status)
VALUES 
  (gen_random_uuid(), 'drcastillo', 'Castillo', 'Rodríguez', 'drcastillo@centromedicouniversal.com', 'doctor', 'Medicina General', 'active'),
  (gen_random_uuid(), 'drjuan', 'Juan Aníbal', 'Castillo', 'drjuan@centromedicouniversal.com', 'doctor', 'Medicina General', 'active'),
  (gen_random_uuid(), 'dravidalva', 'Vidalva', 'Decena Medina', 'dravidalva@centromedicouniversal.com', 'doctor', 'Ginecología', 'active'),
  (gen_random_uuid(), 'drmanuel', 'Manuel Antonio', 'Castillo', 'drmanuel@centromedicouniversal.com', 'doctor', 'Salud Sexual', 'active')
ON CONFLICT (id) DO NOTHING;
