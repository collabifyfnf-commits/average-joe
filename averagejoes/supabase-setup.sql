-- Average Joe's Gym — Supabase Setup
-- Run this SQL in your Supabase project's SQL editor

-- 1. Create gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- 2. Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone can read approved photos
CREATE POLICY "Public read approved" ON gallery
  FOR SELECT USING (status = 'approved');

-- 4. Policy: Anyone can insert (upload form)
CREATE POLICY "Public insert" ON gallery
  FOR INSERT WITH CHECK (true);

-- 5. Policy: Only authenticated users (admin) can update/delete
CREATE POLICY "Auth update" ON gallery
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');

-- 6. Create storage bucket (do this in Supabase Dashboard > Storage)
-- Bucket name: gallery-uploads
-- Public bucket: YES
-- File size limit: 10MB

-- 7. Storage policies (run in SQL editor)
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-uploads', 'gallery-uploads', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-uploads');

CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-uploads');

CREATE POLICY "Auth delete storage" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery-uploads' AND auth.role() = 'authenticated');

-- 8. Create admin user in Supabase Dashboard > Authentication > Users
-- Email: kallipolitismichalis@gmail.com  (TODO: Change to gym owner's email)
-- Set a strong password
