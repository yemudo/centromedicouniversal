-- Schedule Management Schema for Centro Médico Universal
-- First, ensure the user_role column exists

-- Add user_role column if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS user_role VARCHAR(30) DEFAULT 'staff'
CHECK (user_role IN ('super_admin', 'admin', 'doctor', 'medical_assistant', 'staff'));

-- Update your user to be super_admin (Emilio Castillo)
UPDATE profiles 
SET user_role = 'super_admin' 
WHERE id = '6e8c5ea7-b94a-4f13-bec1-98dd113a668d';

-- Create schedule permissions table
CREATE TABLE IF NOT EXISTS schedule_permissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    doctor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    granted_to UUID REFERENCES profiles(id) ON DELETE CASCADE,
    permission_type VARCHAR(20) CHECK (permission_type IN ('full', 'view_only', 'temporary')),
    reason TEXT,
    expires_at TIMESTAMP,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    revoked_at TIMESTAMP,
    UNIQUE(doctor_id, granted_to)
);

-- Create AI appointment requests table for Nivin integration
CREATE TABLE IF NOT EXISTS ai_appointment_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id INTEGER,
    patient_name VARCHAR(255),
    patient_phone VARCHAR(20),
    requested_specialty VARCHAR(100),
    symptoms TEXT,
    preferred_date DATE,
    preferred_time_slot VARCHAR(20),
    urgency_level VARCHAR(20) CHECK (urgency_level IN ('routine', 'urgent', 'emergency')),
    ai_assigned_doctor UUID REFERENCES profiles(id),
    appointment_id UUID REFERENCES appointments(id),
    status VARCHAR(20) DEFAULT 'pending',
    ai_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_schedule_permissions_doctor ON schedule_permissions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_schedule_permissions_granted_to ON schedule_permissions(granted_to);
CREATE INDEX IF NOT EXISTS idx_schedule_permissions_expires ON schedule_permissions(expires_at);
CREATE INDEX IF NOT EXISTS idx_ai_requests_status ON ai_appointment_requests(status, created_at);

-- Enable Row Level Security
ALTER TABLE schedule_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_appointment_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for schedule_permissions

-- Drop existing policies if they exist
DROP POLICY IF EXISTS view_own_schedule_permissions ON schedule_permissions;
DROP POLICY IF EXISTS grant_schedule_permission ON schedule_permissions;
DROP POLICY IF EXISTS revoke_schedule_permission ON schedule_permissions;
DROP POLICY IF EXISTS admin_view_all_permissions ON schedule_permissions;

-- Doctors can view permissions for their own schedule
CREATE POLICY view_own_schedule_permissions ON schedule_permissions
    FOR SELECT USING (
        auth.uid() = doctor_id OR
        auth.uid() = granted_to
    );

-- Doctors can grant permissions for their own schedule
CREATE POLICY grant_schedule_permission ON schedule_permissions
    FOR INSERT WITH CHECK (
        auth.uid() = doctor_id OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_role IN ('super_admin', 'admin')
        )
    );

-- Doctors can revoke permissions they granted
CREATE POLICY revoke_schedule_permission ON schedule_permissions
    FOR UPDATE USING (
        auth.uid() = doctor_id OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_role IN ('super_admin', 'admin')
        )
    );

-- Admins can see all permissions
CREATE POLICY admin_view_all_permissions ON schedule_permissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_role IN ('super_admin', 'admin')
        )
    );

-- RLS Policies for AI appointment requests

-- Drop existing policies if they exist
DROP POLICY IF EXISTS ai_create_requests ON ai_appointment_requests;
DROP POLICY IF EXISTS doctor_view_assigned_requests ON ai_appointment_requests;

-- Only admins and AI service can insert
CREATE POLICY ai_create_requests ON ai_appointment_requests
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_role IN ('super_admin', 'admin')
        )
    );

-- Doctors can view requests assigned to them
CREATE POLICY doctor_view_assigned_requests ON ai_appointment_requests
    FOR SELECT USING (
        ai_assigned_doctor = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_role IN ('super_admin', 'admin')
        )
    );

-- Function to check if user can view/edit a doctor's schedule
CREATE OR REPLACE FUNCTION can_access_schedule(user_id UUID, doctor_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    user_profile profiles;
    has_permission BOOLEAN;
BEGIN
    -- Get user profile
    SELECT * INTO user_profile FROM profiles WHERE id = user_id;
    
    -- Super admins and admins can access all schedules
    IF user_profile.user_role IN ('super_admin', 'admin') THEN
        RETURN TRUE;
    END IF;
    
    -- Doctors can access their own schedule
    IF user_id = doctor_id THEN
        RETURN TRUE;
    END IF;
    
    -- Check if user has been granted permission
    SELECT EXISTS (
        SELECT 1 FROM schedule_permissions 
        WHERE schedule_permissions.doctor_id = doctor_id 
        AND granted_to = user_id 
        AND (expires_at IS NULL OR expires_at > NOW())
        AND revoked_at IS NULL
    ) INTO has_permission;
    
    RETURN has_permission;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically expire permissions
CREATE OR REPLACE FUNCTION expire_old_permissions()
RETURNS void AS $$
BEGIN
    UPDATE schedule_permissions 
    SET revoked_at = NOW() 
    WHERE expires_at < NOW() 
    AND revoked_at IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions to authenticated users
GRANT SELECT ON schedule_permissions TO authenticated;
GRANT INSERT, UPDATE ON schedule_permissions TO authenticated;
GRANT SELECT ON ai_appointment_requests TO authenticated;

-- SUCCESS MESSAGE
-- Tables created: schedule_permissions, ai_appointment_requests
-- Your user has been set to super_admin
-- The system is ready for schedule management and AI appointments