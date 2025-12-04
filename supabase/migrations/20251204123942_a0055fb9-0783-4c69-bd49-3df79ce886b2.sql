-- Create app roles enum and user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS for user_roles - only admins can view/manage roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create tasks table for TikTok/Instagram links
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram_follow', 'instagram_reel')),
    link TEXT NOT NULL,
    reward_amount NUMERIC(12,2) NOT NULL DEFAULT 50,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Everyone can view active tasks
CREATE POLICY "Anyone can view active tasks"
ON public.tasks FOR SELECT
USING (is_active = true);

-- Only admins can manage tasks
CREATE POLICY "Admins can manage tasks"
ON public.tasks FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create task completions table
CREATE TABLE public.task_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    reward_earned NUMERIC(12,2) NOT NULL,
    UNIQUE (user_id, task_id)
);

ALTER TABLE public.task_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own completions"
ON public.task_completions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own completions"
ON public.task_completions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create withdrawal requests table
CREATE TABLE public.withdrawal_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL,
    phone_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    processed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own withdrawals"
ON public.withdrawal_requests FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawal requests"
ON public.withdrawal_requests FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all withdrawals"
ON public.withdrawal_requests FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update withdrawals"
ON public.withdrawal_requests FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Function to process task completion and credit user
CREATE OR REPLACE FUNCTION public.complete_task(p_task_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_reward NUMERIC(12,2);
    v_is_active BOOLEAN;
    v_already_completed BOOLEAN;
BEGIN
    v_user_id := auth.uid();
    
    -- Check if user is active
    SELECT is_active INTO v_is_active FROM public.profiles WHERE id = v_user_id;
    IF NOT v_is_active THEN
        RETURN FALSE;
    END IF;
    
    -- Check if already completed
    SELECT EXISTS(SELECT 1 FROM public.task_completions WHERE user_id = v_user_id AND task_id = p_task_id) INTO v_already_completed;
    IF v_already_completed THEN
        RETURN FALSE;
    END IF;
    
    -- Get task reward
    SELECT reward_amount INTO v_reward FROM public.tasks WHERE id = p_task_id AND is_active = true;
    IF v_reward IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Insert completion
    INSERT INTO public.task_completions (user_id, task_id, reward_earned)
    VALUES (v_user_id, p_task_id, v_reward);
    
    -- Update user balance
    UPDATE public.profiles
    SET balance = balance + v_reward,
        total_earned = total_earned + v_reward
    WHERE id = v_user_id;
    
    RETURN TRUE;
END;
$$;