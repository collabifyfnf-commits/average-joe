"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase, type GalleryPhoto } from "@/lib/supabase";

type Tab = "pending" | "approved";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("pending");
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [tab]);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) router.replace("/admin");
  }

  async function fetchPhotos() {
    setLoading(true);
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("status", tab)
      .order(tab === "pending" ? "uploaded_at" : "approved_at", { ascending: false });
    setPhotos((data as GalleryPhoto[]) || []);
    setLoading(false);
  }

  async function handleApprove(photo: GalleryPhoto) {
    setActionLoading(photo.id);
    await fetch("/api/gallery/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photo.id }),
    });
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setActionLoading(null);
  }

  async function handleReject(photo: GalleryPhoto) {
    if (!confirm(`Reject and delete photo by ${photo.name}?`)) return;
    setActionLoading(photo.id);
    await fetch("/api/gallery/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photo.id, filePath: photo.file_path }),
    });
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setActionLoading(null);
  }

  async function handleRemove(photo: GalleryPhoto) {
    if (!confirm(`Remove photo by ${photo.name}?`)) return;
    setActionLoading(photo.id);
    await fetch("/api/gallery/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photo.id, filePath: photo.file_path }),
    });
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setActionLoading(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin");
  }

  function getPublicUrl(filePath: string) {
    const { data } = supabase.storage.from("gallery-uploads").getPublicUrl(filePath);
    return data.publicUrl;
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("el-GR");
  }

  const tabStyle = (active: boolean) => ({
    padding: "10px 24px",
    fontFamily: "var(--font-bebas)",
    fontSize: "1rem",
    letterSpacing: "0.1em",
    background: active ? "#4A6FFF" : "transparent",
    color: active ? "#F5F5F5" : "#9A9A9A",
    border: "none",
    cursor: "pointer",
    transition: "all 150ms",
    borderBottom: active ? "2px solid #4A6FFF" : "2px solid transparent",
  });

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "#0A0A0A", padding: "32px 0" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 36,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                color: "#4A6FFF",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              ADMIN PANEL
            </p>
            <h1
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "2rem",
                letterSpacing: "0.06em",
                color: "#F5F5F5",
              }}
            >
              AVERAGE JOE&apos;S GYM — GALLERY
            </h1>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "1px solid #333",
              color: "#9A9A9A",
              padding: "8px 20px",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 150ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff4444";
              (e.currentTarget as HTMLButtonElement).style.color = "#ff4444";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#333";
              (e.currentTarget as HTMLButtonElement).style.color = "#9A9A9A";
            }}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #222", marginBottom: 32, display: "flex", gap: 0 }}>
          <button onClick={() => setTab("pending")} style={tabStyle(tab === "pending")}>
            Pending {tab === "pending" && photos.length > 0 && `(${photos.length})`}
          </button>
          <button onClick={() => setTab("approved")} style={tabStyle(tab === "approved")}>
            Approved
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div
              style={{
                width: 36,
                height: 36,
                border: "2px solid #222",
                borderTop: "2px solid #4A6FFF",
                borderRadius: "50%",
                margin: "0 auto 12px",
                animation: "spin 1s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: "#9A9A9A", fontSize: "0.875rem" }}>Loading...</p>
          </div>
        ) : photos.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <p style={{ fontSize: "2rem", marginBottom: 12 }}>
              {tab === "pending" ? "🎉" : "📷"}
            </p>
            <p style={{ color: "#9A9A9A" }}>
              {tab === "pending" ? "No pending photos 🎉" : "No approved photos yet"}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  background: "#111111",
                  border: "1px solid #222",
                  overflow: "hidden",
                  opacity: actionLoading === photo.id ? 0.5 : 1,
                  transition: "opacity 150ms",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
                  <Image
                    src={getPublicUrl(photo.file_path)}
                    alt={`Photo by ${photo.name}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "14px 16px" }}>
                  <p style={{ color: "#F5F5F5", fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>
                    {photo.name}
                  </p>
                  <p style={{ color: "#9A9A9A", fontSize: "0.75rem", marginBottom: 16 }}>
                    {formatDate(photo.uploaded_at)}
                  </p>

                  {tab === "pending" ? (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => handleApprove(photo)}
                        disabled={!!actionLoading}
                        style={{
                          flex: 1,
                          background: "#2a7a2a",
                          color: "#F5F5F5",
                          border: "none",
                          padding: "9px 12px",
                          fontFamily: "var(--font-bebas)",
                          fontSize: "0.9rem",
                          letterSpacing: "0.08em",
                          cursor: "pointer",
                          transition: "all 150ms",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#35a035")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2a7a2a")}
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleReject(photo)}
                        disabled={!!actionLoading}
                        style={{
                          flex: 1,
                          background: "#7a2a2a",
                          color: "#F5F5F5",
                          border: "none",
                          padding: "9px 12px",
                          fontFamily: "var(--font-bebas)",
                          fontSize: "0.9rem",
                          letterSpacing: "0.08em",
                          cursor: "pointer",
                          transition: "all 150ms",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#a03535")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#7a2a2a")}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRemove(photo)}
                      disabled={!!actionLoading}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "1px solid #7a2a2a",
                        color: "#ff6b6b",
                        padding: "9px 12px",
                        fontFamily: "var(--font-bebas)",
                        fontSize: "0.9rem",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        transition: "all 150ms",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#7a2a2a";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      }}
                    >
                      🗑️ Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
