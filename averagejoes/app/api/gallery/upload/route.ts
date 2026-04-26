import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// TODO: Change admin email to gym owner's email
const ADMIN_EMAIL = "kallipolitismichalis@gmail.com";
const ADMIN_URL = "https://average-joes-gym.gr/admin";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("photo") as File;

    if (!name || !file) {
      return NextResponse.json({ error: "Missing name or photo" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Upload to Supabase Storage
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery-uploads")
      .upload(fileName, file, { contentType: file.type });

    if (uploadError) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    // Insert record
    const { error: dbError } = await supabase.from("gallery").insert({
      name,
      file_path: fileName,
      status: "pending",
    });

    if (dbError) {
      // Clean up uploaded file
      await supabase.storage.from("gallery-uploads").remove([fileName]);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your_resend_api_key") {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Average Joe's Gym <noreply@average-joes-gym.gr>",
        to: ADMIN_EMAIL,
        subject: "New photo pending approval — Average Joe's Gym",
        html: `
          <h2>New Photo Submission</h2>
          <p>A new photo was uploaded by <strong>${name}</strong>.</p>
          <p>Login to the admin panel to approve or reject:</p>
          <p><a href="${ADMIN_URL}">${ADMIN_URL}</a></p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
