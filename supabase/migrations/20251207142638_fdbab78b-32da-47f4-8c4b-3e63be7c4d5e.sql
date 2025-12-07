-- Allow admins to view all profiles for analytics
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to view all deposits for analytics
CREATE POLICY "Admins can view all deposits" 
ON public.deposits 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));