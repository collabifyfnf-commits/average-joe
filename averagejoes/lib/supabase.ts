import { createClient } from "@supabase/supabase-js";

function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";
  return createClient(url, key);
}

export const supabase = createSupabaseClient();

export type GalleryPhoto = {
  id: string;
  name: string;
  file_path: string;
  status: "pending" | "approved" | "rejected";
  uploaded_at: string;
  approved_at: string | null;
};
