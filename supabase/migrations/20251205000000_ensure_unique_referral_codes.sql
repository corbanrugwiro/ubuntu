-- Migration to ensure every user has a unique referral code
-- This migration adds safeguards to prevent referral_code violations

-- First, backfill any existing users that might not have referral codes
-- (This shouldn't happen due to NOT NULL constraint, but just in case)
DO $$
DECLARE
  user_record RECORD;
  new_code TEXT;
BEGIN
  FOR user_record IN 
    SELECT id FROM public.profiles 
    WHERE referral_code IS NULL OR referral_code = ''
  LOOP
    -- Generate unique referral code
    LOOP
      new_code := 'UBU' || upper(substr(md5(random()::text || user_record.id::text), 1, 6));
      EXIT WHEN NOT EXISTS(SELECT 1 FROM public.profiles WHERE referral_code = new_code);
    END LOOP;
    
    UPDATE public.profiles 
    SET referral_code = new_code 
    WHERE id = user_record.id;
  END LOOP;
END $$;

-- Improve generate_referral_code function to be more robust
-- Add retry limit and better uniqueness check
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
  max_attempts INTEGER := 100;
  attempts INTEGER := 0;
BEGIN
  LOOP
    attempts := attempts + 1;
    IF attempts > max_attempts THEN
      RAISE EXCEPTION 'Failed to generate unique referral code after % attempts', max_attempts;
    END IF;
    
    -- Generate code with timestamp component for better uniqueness
    code := 'UBU' || upper(substr(md5(random()::text || now()::text || random()::text), 1, 6));
    
    -- Check if code exists
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE referral_code = code) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Create function to prevent referral_code updates that would violate uniqueness
-- This prevents users from changing their referral_code (only system/admins can)
CREATE OR REPLACE FUNCTION public.prevent_invalid_referral_code_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  code_exists BOOLEAN;
  is_admin BOOLEAN;
BEGIN
  -- Prevent setting referral_code to NULL or empty string
  IF NEW.referral_code IS NULL OR TRIM(NEW.referral_code) = '' THEN
    RAISE EXCEPTION 'referral_code cannot be NULL or empty';
  END IF;
  
  -- If referral_code is being changed
  IF OLD.referral_code IS DISTINCT FROM NEW.referral_code THEN
    -- Allow setting referral_code if it was previously NULL or empty (backfill case)
    IF OLD.referral_code IS NULL OR TRIM(OLD.referral_code) = '' THEN
      -- This is a backfill or initial assignment, just check for duplicates
      SELECT EXISTS(
        SELECT 1 FROM public.profiles 
        WHERE referral_code = NEW.referral_code 
        AND id != NEW.id
      ) INTO code_exists;
      
      IF code_exists THEN
        RAISE EXCEPTION 'referral_code must be unique. Code % already exists', NEW.referral_code;
      END IF;
      
      RETURN NEW;
    END IF;
    
    -- For existing referral codes, check if user is admin
    -- Check if current user is admin (allow admins to update for system purposes)
    SELECT public.has_role(auth.uid(), 'admin') INTO is_admin;
    
    IF NOT is_admin THEN
      -- Regular users cannot change their referral_code once it's been assigned
      RAISE EXCEPTION 'referral_code cannot be changed once assigned';
    END IF;
    
    -- Even for admins, check for duplicates
    SELECT EXISTS(
      SELECT 1 FROM public.profiles 
      WHERE referral_code = NEW.referral_code 
      AND id != NEW.id
    ) INTO code_exists;
    
    IF code_exists THEN
      RAISE EXCEPTION 'referral_code must be unique. Code % already exists', NEW.referral_code;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to enforce referral_code uniqueness on updates
DROP TRIGGER IF EXISTS enforce_unique_referral_code ON public.profiles;
CREATE TRIGGER enforce_unique_referral_code
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  WHEN (OLD.referral_code IS DISTINCT FROM NEW.referral_code)
  EXECUTE FUNCTION public.prevent_invalid_referral_code_update();

-- Add comment to document the constraint
COMMENT ON COLUMN public.profiles.referral_code IS 
  'Unique referral code for each user. Automatically generated on user creation and cannot be changed to a duplicate value.';

