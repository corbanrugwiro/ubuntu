-- Add thumbnail_url column to tasks
ALTER TABLE public.tasks ADD COLUMN thumbnail_url text;

-- Create storage bucket for task thumbnails
INSERT INTO storage.buckets (id, name, public) VALUES ('task-thumbnails', 'task-thumbnails', true);

-- Allow anyone to view thumbnails
CREATE POLICY "Anyone can view task thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'task-thumbnails');

-- Allow admins to upload thumbnails
CREATE POLICY "Admins can upload task thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'task-thumbnails' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update thumbnails
CREATE POLICY "Admins can update task thumbnails"
ON storage.objects FOR UPDATE
USING (bucket_id = 'task-thumbnails' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete thumbnails
CREATE POLICY "Admins can delete task thumbnails"
ON storage.objects FOR DELETE
USING (bucket_id = 'task-thumbnails' AND has_role(auth.uid(), 'admin'::app_role));