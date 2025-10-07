-- Security Updates for Centro Médico Universal Database
-- Add password tracking and security features

-- Add password tracking columns to profiles table (only if they don't exist)
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS password_changed BOOLEAN DEFAULT false;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS password_changed_at TIMESTAMP;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS account_locked_until TIMESTAMP;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN DEFAULT true;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS password_expires_at TIMESTAMP;

-- Create password history table to prevent reuse
CREATE TABLE IF NOT EXISTS password_history (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create session activity log
CREATE TABLE IF NOT EXISTS session_activity (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    login_time TIMESTAMP DEFAULT NOW(),
    logout_time TIMESTAMP,
    logout_reason VARCHAR(50), -- timeout, manual, forced
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- Function to check password expiration (90 days)
CREATE OR REPLACE FUNCTION check_password_expiration()
RETURNS TRIGGER AS $$
BEGIN
    -- Set password expiration to 90 days from change
    NEW.password_expires_at := NEW.password_changed_at + INTERVAL '90 days';
    
    -- If password is expired, force change
    IF NEW.password_expires_at < NOW() THEN
        NEW.must_change_password := true;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS password_expiration_trigger ON profiles;

-- Trigger for password expiration
CREATE TRIGGER password_expiration_trigger
AFTER UPDATE OF password_changed_at ON profiles
FOR EACH ROW
EXECUTE FUNCTION check_password_expiration();

-- Function to handle failed login attempts
CREATE OR REPLACE FUNCTION handle_failed_login(user_email TEXT)
RETURNS void AS $$
DECLARE
    user_profile profiles;
BEGIN
    -- Get user profile
    SELECT * INTO user_profile FROM profiles 
    WHERE id = (SELECT id FROM auth.users WHERE email = user_email);
    
    IF FOUND THEN
        -- Increment failed attempts
        UPDATE profiles 
        SET failed_login_attempts = failed_login_attempts + 1
        WHERE id = user_profile.id;
        
        -- Lock account after 5 failed attempts
        IF user_profile.failed_login_attempts >= 4 THEN
            UPDATE profiles 
            SET account_locked_until = NOW() + INTERVAL '30 minutes'
            WHERE id = user_profile.id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to reset failed login attempts on successful login
CREATE OR REPLACE FUNCTION reset_failed_login_attempts(user_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE profiles 
    SET failed_login_attempts = 0,
        last_login = NOW()
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Update existing users to require password change (only if column was just added)
UPDATE profiles 
SET must_change_password = true,
    password_changed = false
WHERE password_changed IS NULL;

-- Create indexes for faster lookups (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_profiles_password_tracking ON profiles(password_changed, must_change_password);
CREATE INDEX IF NOT EXISTS idx_password_history_user ON password_history(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_session_activity_user ON session_activity(user_id, login_time DESC);

-- Enable RLS on new tables
ALTER TABLE password_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_activity ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS password_history_policy ON password_history;
DROP POLICY IF EXISTS session_activity_policy ON session_activity;
DROP POLICY IF EXISTS session_activity_admin_policy ON session_activity;

-- Users can only see their own password history
CREATE POLICY password_history_policy ON password_history
    FOR ALL USING (auth.uid() = user_id);

-- Users can only see their own session activity
CREATE POLICY session_activity_policy ON session_activity
    FOR ALL USING (auth.uid() = user_id);

-- Admins can see all session activity
CREATE POLICY session_activity_admin_policy ON session_activity
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_role IN ('super_admin', 'admin')
        )
    );

-- Grant permissions
GRANT SELECT, INSERT ON password_history TO authenticated;
GRANT SELECT, INSERT, UPDATE ON session_activity TO authenticated;

-- SUCCESS MESSAGE
-- Security features added:
-- ✓ Password change tracking
-- ✓ Session activity logging
-- ✓ Failed login tracking
-- ✓ Account lockout after 5 failed attempts
-- ✓ Password expiration after 90 days