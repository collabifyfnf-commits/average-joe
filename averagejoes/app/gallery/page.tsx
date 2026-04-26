"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { supabase, type GalleryPhoto } from "@/lib/supabase";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function GalleryPage() {
  const { tx } = useLang();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    setLoading(true);
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("status", "approved")
      .order("approved_at", { ascending: false });
    setPhotos((data as GalleryPhoto[]) || []);
    setLoading(false);
  }

  function getPublicUrl(filePath: string) {
    const { data } = supabase.storage.from("gallery-uploads").getPublicUrl(filePath);
    return data.publicUrl;
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("el-GR", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !file) return;
    setSubmitting(true);
    setSubmitStatus("idle");

    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("photo", file);

    const res = await fetch("/api/gallery/upload", { method: "POST", body: fd });
    if (res.ok) {
      setSubmitStatus("success");
      setName("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setSubmitStatus("error");
    }
    setSubmitting(false);
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          padding: "80px 20px",
          background: "#0D0D0D",
          borderBottom: "1px solid #222",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,111,255,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.68rem",
              letterSpacing: "0.28em",
              color: "#4A6FFF",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            AVERAGE JOE&apos;S GYM
          </p>
          <h1
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(3rem, 10vw, 5.5rem)",
              letterSpacing: "0.04em",
              color: "#F5F5F5",
              lineHeight: 1,
              marginBottom: 14,
            }}
          >
            {tx(t.gallery.title)}
          </h1>
          <p style={{ color: "#9A9A9A", fontSize: "1rem" }}>{tx(t.gallery.subtitle)}</p>
        </div>
      </section>

      {/* ─── GALLERY GRID ─── */}
      <section style={{ padding: "60px 0", background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div style={{ textAlign: "center", padding: 60 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "2px solid #222",
                  borderTop: "2px solid #4A6FFF",
                  borderRadius: "50%",
                  margin: "0 auto 16px",
                  animation: "spin 1s linear infinite",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: "#9A9A9A", fontSize: "0.875rem" }}>Loading...</p>
            </div>
          ) : photos.length === 0 ? (
            <div style={{ textAlign: "center", padding: 80, color: "#9A9A9A" }}>
              <p style={{ fontSize: "1.5rem", marginBottom: 8 }}>📷</p>
              <p>{tx(t.gallery.noPhotos)}</p>
            </div>
          ) : (
            <div
              style={{
                columns: "2 280px",
                columnGap: 16,
              }}
            >
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    breakInside: "avoid",
                    marginBottom: 16,
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid #222",
                  }}
                >
                  <Image
                    src={getPublicUrl(photo.file_path)}
                    alt={`Photo by ${photo.name}`}
                    width={400}
                    height={300}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div
                    style={{
                      background: "rgba(0,0,0,0.75)",
                      backdropFilter: "blur(4px)",
                      padding: "8px 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#F5F5F5", fontSize: "0.8rem", fontWeight: 500 }}>{photo.name}</span>
                    <span style={{ color: "#9A9A9A", fontSize: "0.72rem" }}>
                      {photo.approved_at ? formatDate(photo.approved_at) : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, #222, transparent)" }} />

      {/* ─── UPLOAD FORM ─── */}
      <section style={{ padding: "80px 0", background: "#0D0D0D" }}>
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(2rem, 6vw, 3rem)",
                letterSpacing: "0.06em",
                color: "#F5F5F5",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              {tx(t.gallery.uploadTitle)}
            </h2>
            <p style={{ color: "#9A9A9A", fontSize: "0.875rem", textAlign: "center", marginBottom: 40 }}>
              {tx(t.gallery.subtitle)}
            </p>

            {submitStatus === "success" ? (
              <div
                style={{
                  background: "rgba(74,111,255,0.1)",
                  border: "1px solid #4A6FFF",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>✅</div>
                <p style={{ color: "#F5F5F5", fontFamily: "var(--font-bebas)", fontSize: "1.2rem", letterSpacing: "0.06em" }}>
                  {tx(t.gallery.success)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Name field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.72rem",
                      letterSpacing: "0.18em",
                      color: "#9A9A9A",
                      textTransform: "uppercase",
                      marginBottom: 8,
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    {tx(t.gallery.nameLabel)}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={tx(t.gallery.namePlaceholder)}
                    required
                    style={{
                      width: "100%",
                      background: "#111111",
                      border: "1px solid #222",
                      color: "#F5F5F5",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      fontFamily: "var(--font-dm-sans)",
                      outline: "none",
                      transition: "border-color 150ms",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#4A6FFF")}
                    onBlur={(e) => (e.target.style.borderColor = "#222")}
                  />
                </div>

                {/* Photo field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.72rem",
                      letterSpacing: "0.18em",
                      color: "#9A9A9A",
                      textTransform: "uppercase",
                      marginBottom: 8,
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    {tx(t.gallery.photoLabel)}
                  </label>
                  <div
                    style={{
                      border: "1px dashed #333",
                      padding: "28px 20px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "border-color 150ms",
                      background: "#111111",
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = "#4A6FFF";
                    }}
                    onDragLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
                    onDrop={(e) => {
                      e.preventDefault();
                      const dropped = e.dataTransfer.files[0];
                      if (dropped && dropped.type.startsWith("image/")) setFile(dropped);
                      e.currentTarget.style.borderColor = "#333";
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: 8 }}>📸</div>
                    <p style={{ color: file ? "#F5F5F5" : "#9A9A9A", fontSize: "0.875rem" }}>
                      {file ? file.name : "Click or drag & drop — max 10MB"}
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setFile(f);
                    }}
                  />
                </div>

                {submitStatus === "error" && (
                  <p style={{ color: "#ff4444", fontSize: "0.875rem" }}>{tx(t.gallery.error)}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !file}
                  style={{
                    background: submitting || !name.trim() || !file ? "#333" : "#4A6FFF",
                    color: "#F5F5F5",
                    padding: "15px 36px",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "1.15rem",
                    letterSpacing: "0.12em",
                    border: "none",
                    cursor: submitting || !name.trim() || !file ? "not-allowed" : "pointer",
                    transition: "all 150ms",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting && name.trim() && file) {
                      (e.currentTarget as HTMLButtonElement).style.background = "#6B8FFF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting && name.trim() && file) {
                      (e.currentTarget as HTMLButtonElement).style.background = "#4A6FFF";
                    }
                  }}
                >
                  {submitting ? "..." : tx(t.gallery.submit)}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
