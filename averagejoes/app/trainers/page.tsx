"use client";

import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TrainersPage() {
  const { tx } = useLang();

  const trainers = [
    {
      key: "stelios",
      data: t.trainers.stelios,
      imageLeft: true,
      imageFile: "/images/trainer-stelios.jpg",
    },
    {
      key: "george",
      data: t.trainers.george,
      imageLeft: false,
      imageFile: "/images/trainer-george.jpg",
    },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          position: "relative",
          padding: "80px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D0D",
          borderBottom: "1px solid #222",
          overflow: "hidden",
          minHeight: 300,
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
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
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
            }}
          >
            {tx(t.trainers.heroTitle)}
          </h1>
        </div>
      </section>

      {/* ─── TRAINER SECTIONS ─── */}
      {trainers.map((trainer, idx) => {
        const { data, imageLeft, imageFile } = trainer;
        const bg = idx % 2 === 0 ? "#0A0A0A" : "#0D0D0D";

        // Image block
        const ImageBlock = (
          <ScrollReveal delay={0}>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3/4",
                overflow: "hidden",
              }}
            >
              <Image
                src={imageFile}
                alt={tx(data.name)}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "30%",
                  background: `linear-gradient(to top, ${bg}, transparent)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "#4A6FFF",
                }}
              />
            </div>
          </ScrollReveal>
        );

        // Bio block
        const BioBlock = (
          <ScrollReveal delay={150}>
            <div>
              <span
                style={{
                  display: "inline-block",
                  background: "#1A1A2E",
                  color: "#4A6FFF",
                  padding: "4px 14px",
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  fontFamily: "var(--font-dm-sans)",
                  marginBottom: 16,
                  border: "1px solid rgba(74,111,255,0.3)",
                  textTransform: "uppercase",
                }}
              >
                {tx(data.role)}
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  letterSpacing: "0.04em",
                  color: "#F5F5F5",
                  lineHeight: 1.05,
                  marginBottom: 20,
                }}
              >
                {tx(data.name)}
              </h2>

              <p style={{ color: "#9A9A9A", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 28 }}>
                {tx(data.bio)}
              </p>

              {/* Certs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {data.certs.map((cert) => (
                  <span
                    key={cert}
                    style={{
                      background: "#111111",
                      color: "#F5F5F5",
                      padding: "5px 14px",
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      fontFamily: "var(--font-dm-sans)",
                      border: "1px solid #222",
                      fontWeight: 600,
                    }}
                  >
                    {cert}
                  </span>
                ))}
              </div>

              {/* Instagram */}
              <a
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#111111",
                  border: "1px solid #333",
                  color: "#F5F5F5",
                  padding: "10px 18px",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-dm-sans)",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E1306C";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#E1306C";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#333";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#F5F5F5";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @{data.instagram}
              </a>
            </div>
          </ScrollReveal>
        );

        return (
          <section key={trainer.key} style={{ padding: "88px 0", background: bg }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 64,
                  alignItems: "center",
                }}
              >
                {imageLeft ? (
                  <>
                    {ImageBlock}
                    {BioBlock}
                  </>
                ) : (
                  <>
                    {BioBlock}
                    {ImageBlock}
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
