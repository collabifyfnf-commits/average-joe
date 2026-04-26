"use client";

import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import ScrollReveal from "@/components/ui/ScrollReveal";

const BOOK_URL = "https://members.averagejoes.gr/book.php";

export default function ServicesPage() {
  const { tx, lang } = useLang();
  const groupAspects = lang === "gr" ? t.services.group.aspects.gr : t.services.group.aspects.en;
  const hyroxComponents = lang === "gr" ? t.services.hyrox.components.gr : t.services.hyrox.components.en;

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          minHeight: 360,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/group-training.jpg"
          alt="Services"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(10,10,10,0.92) 100%)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px" }}>
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
            {tx(t.services.heroTitle)}
          </h1>
          <p style={{ color: "#9A9A9A", fontSize: "1rem" }}>{tx(t.services.heroSub)}</p>
        </div>
      </section>

      {/* ─── GROUP TRAINING ─── */}
      <section style={{ padding: "88px 0", background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Image */}
            <ScrollReveal>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                <Image
                  src="/images/group-training.jpg"
                  alt="Group Training"
                  fill
                  style={{ objectFit: "cover" }}
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

            {/* Content */}
            <ScrollReveal delay={150}>
              <span
                style={{
                  display: "inline-block",
                  background: "#1A1A2E",
                  color: "#4A6FFF",
                  padding: "4px 14px",
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  fontFamily: "var(--font-dm-sans)",
                  marginBottom: 20,
                  border: "1px solid rgba(74,111,255,0.3)",
                }}
              >
                {tx(t.services.group.badge)}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "0.04em",
                  color: "#F5F5F5",
                  lineHeight: 1.05,
                  marginBottom: 20,
                }}
              >
                {tx(t.services.group.title)}
              </h2>
              <p style={{ color: "#9A9A9A", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 32 }}>
                {tx(t.services.group.desc)}
              </p>

              {/* Key aspects */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
                {groupAspects.map((aspect, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        background: "#4A6FFF",
                        flexShrink: 0,
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <span style={{ color: "#F5F5F5", fontWeight: 600, fontSize: "0.9rem" }}>{aspect.label}</span>
                      <span style={{ color: "#9A9A9A", fontSize: "0.9rem" }}> — {aspect.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#4A6FFF",
                  color: "#F5F5F5",
                  padding: "14px 36px",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "1.1rem",
                  letterSpacing: "0.12em",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#6B8FFF";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#4A6FFF";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                {tx(t.services.group.cta)}
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, #222, transparent)" }} />

      {/* ─── HYROX ─── */}
      <section style={{ padding: "88px 0", background: "#0D0D0D" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Content — left on desktop (reversed via order on mobile handled by auto-fit) */}
            <ScrollReveal delay={150}>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255,215,0,0.08)",
                    color: "#FFD700",
                    padding: "4px 14px",
                    fontSize: "0.68rem",
                    letterSpacing: "0.2em",
                    fontFamily: "var(--font-dm-sans)",
                    marginBottom: 20,
                    border: "1px solid rgba(255,215,0,0.3)",
                  }}
                >
                  {tx(t.services.hyrox.badge)}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    letterSpacing: "0.04em",
                    color: "#F5F5F5",
                    lineHeight: 1.05,
                    marginBottom: 20,
                  }}
                >
                  {tx(t.services.hyrox.title)}
                </h2>
                <p style={{ color: "#9A9A9A", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 28 }}>
                  {tx(t.services.hyrox.desc)}
                </p>

                {/* Stations chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                  {t.services.hyrox.stations.map((s) => (
                    <span
                      key={s}
                      style={{
                        background: "#1A1A2E",
                        color: "#F5F5F5",
                        padding: "5px 14px",
                        fontSize: "0.75rem",
                        letterSpacing: "0.06em",
                        fontFamily: "var(--font-dm-sans)",
                        border: "1px solid #222",
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Key components */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                  {hyroxComponents.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          background: "rgba(255,215,0,0.12)",
                          border: "1px solid #FFD700",
                          flexShrink: 0,
                          marginTop: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFD700",
                          fontSize: "0.6rem",
                        }}
                      >
                        ✓
                      </div>
                      <div>
                        <span style={{ color: "#F5F5F5", fontWeight: 600, fontSize: "0.9rem" }}>{c.label}</span>
                        <span style={{ color: "#9A9A9A", fontSize: "0.9rem" }}> — {c.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    color: "#9A9A9A",
                    fontSize: "0.8rem",
                    marginBottom: 28,
                    fontStyle: "italic",
                  }}
                >
                  * {tx(t.services.hyrox.note)}
                </p>

                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#FFD700",
                    color: "#0A0A0A",
                    padding: "14px 36px",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "1.1rem",
                    letterSpacing: "0.12em",
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "all 150ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                  }}
                >
                  {tx(t.services.hyrox.cta)}
                </a>
              </div>
            </ScrollReveal>

            {/* Image */}
            <ScrollReveal>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  order: -1,
                }}
              >
                <Image
                  src="/images/hyrox.jpg"
                  alt="HYROX Training"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "#FFD700",
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
