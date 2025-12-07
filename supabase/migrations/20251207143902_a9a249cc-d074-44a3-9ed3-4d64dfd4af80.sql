-- Update complete_task function to enforce 20 tasks per day limit
CREATE OR REPLACE FUNCTION public.complete_task(p_task_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
DECLARE
    v_user_id UUID;
    v_reward NUMERIC(12,2);
    v_is_active BOOLEAN;
    v_already_completed BOOLEAN;
    v_daily_count INTEGER;
BEGIN
    v_user_id := auth.uid();
    
    -- Check if user is active
    SELECT is_active INTO v_is_active FROM public.profiles WHERE id = v_user_id;
    IF NOT v_is_active THEN
        RETURN FALSE;
    END IF;
    
    -- Check if already completed this specific task
    SELECT EXISTS(SELECT 1 FROM public.task_completions WHERE user_id = v_user_id AND task_id = p_task_id) INTO v_already_completed;
    IF v_already_completed THEN
        RETURN FALSE;
    END IF;
    
    -- Check daily limit (20 tasks per day)
    SELECT COUNT(*) INTO v_daily_count 
    FROM public.task_completions 
    WHERE user_id = v_user_id 
    AND completed_at >= CURRENT_DATE 
    AND completed_at < CURRENT_DATE + INTERVAL '1 day';
    
    IF v_daily_count >= 20 THEN
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