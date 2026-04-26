import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const { id, filePath } = await req.json();
  const supabase = getSupabase();

  // Delete from Storage
  if (filePath) {
    await supabase.storage.from("gallery-uploads").remove([filePath]);
  }

  // Delete record
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
