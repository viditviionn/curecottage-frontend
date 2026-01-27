-- Create storage bucket for provider photos
INSERT INTO storage.buckets (id, name, public) VALUES ('provider-photos', 'provider-photos', true);

-- Create policies for provider photo uploads
CREATE POLICY "Provider photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'provider-photos');

CREATE POLICY "Anyone can upload provider photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'provider-photos');

CREATE POLICY "Users can update their own provider photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'provider-photos');

CREATE POLICY "Users can delete their own provider photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'provider-photos');