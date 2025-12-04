-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES public.profiles(id),
  balance DECIMAL(12,2) DEFAULT 0,
  total_earned DECIMAL(12,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create deposits table
CREATE TABLE public.deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(12,2) NOT NULL,
  phone_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  transaction_ref TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on deposits
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;

-- Deposits policies
CREATE POLICY "Users can view their own deposits"
  ON public.deposits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own deposits"
  ON public.deposits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create referral_earnings table
CREATE TABLE public.referral_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  deposit_id UUID NOT NULL REFERENCES public.deposits(id) ON DELETE CASCADE,
  amount DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on referral_earnings
ALTER TABLE public.referral_earnings ENABLE ROW LEVEL SECURITY;

-- Referral earnings policies
CREATE POLICY "Users can view their own referral earnings"
  ON public.referral_earnings FOR SELECT
  USING (auth.uid() = referrer_id);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    code := 'UBU' || upper(substr(md5(random()::text), 1, 6));
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE referral_code = code) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  RETURN code;
END;
$$;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  referrer_id UUID;
  new_referral_code TEXT;
BEGIN
  -- Generate unique referral code
  new_referral_code := public.generate_referral_code();
  
  -- Check if referred_by code exists and get referrer id
  IF NEW.raw_user_meta_data->>'referred_by' IS NOT NULL THEN
    SELECT id INTO referrer_id FROM public.profiles 
    WHERE referral_code = NEW.raw_user_meta_data->>'referred_by';
  END IF;
  
  INSERT INTO public.profiles (id, full_name, email, phone, referral_code, referred_by)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    new_referral_code,
    referrer_id
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to process deposit and credit referrer
CREATE OR REPLACE FUNCTION public.process_deposit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_profile RECORD;
  referrer_id UUID;
  referral_amount DECIMAL(12,2);
BEGIN
  -- Only process when status changes to completed
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    -- Get user profile
    SELECT * INTO user_profile FROM public.profiles WHERE id = NEW.user_id;
    
    -- Activate user if this is their first completed deposit
    IF NOT user_profile.is_active THEN
      UPDATE public.profiles SET is_active = true WHERE id = NEW.user_id;
      
      -- Credit referrer if exists
      IF user_profile.referred_by IS NOT NULL THEN
        referral_amount := NEW.amount * 0.20; -- 20% commission
        
        -- Update referrer balance
        UPDATE public.profiles 
        SET balance = balance + referral_amount,
            total_earned = total_earned + referral_amount
        WHERE id = user_profile.referred_by;
        
        -- Record referral earning
        INSERT INTO public.referral_earnings (referrer_id, referred_id, deposit_id, amount)
        VALUES (user_profile.referred_by, NEW.user_id, NEW.id, referral_amount);
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger for deposit processing
CREATE TRIGGER on_deposit_completed
  AFTER INSERT OR UPDATE ON public.deposits
  FOR EACH ROW EXECUTE FUNCTION public.process_deposit();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profile timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();