"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { t, reviews } from "@/lib/translations";
import ScrollReveal from "@/components/ui/ScrollReveal";

const BOOK_URL = "https://members.averagejoes.gr/book.php";
const GOOGLE_MAPS_REVIEWS =
  "https://www.google.com/maps/place/Average+Joe%E2%80%99s+Gym/@35.5150107,24.0288581,17z/data=!4m16!1m9!3m8!1s0x149c7dfba5393381:0x6c084476416eed9b!2sAverage+Joe%E2%80%99s+Gym!8m2!3d35.5150064!4d24.031433!9m1!1b1!16s%2Fg%2F11wj3xb3hl!3m5!1s0x149c7dfba5393381:0x6c084476416eed9b!8m2!3d35.5150064!4d24.031433!16s%2Fg%2F11wj3xb3hl?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D";
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.0!2d24.0288581!3d35.5150107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149c7dfba5393381%3A0x6c084476416eed9b!2sAverage%20Joe's%20Gym!5e0!3m2!1sen!2sgr!4v1234567890";

export default function Home() {
  const { tx, lang } = useLang();
  const hours = lang === "gr" ? t.location.hours.gr : t.location.hours.en;
  const doubled = [...reviews, ...reviews];

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          position: "relative",
          height: "100svh",
          minHeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/hero-group.jpg"
          alt="Average Joe's Gym group training"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.72) 60%, rgba(10,10,10,0.95) 100%)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 20px",
            maxWidth: 800,
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.68rem",
              letterSpacing: "0.28em",
              color: "#9A9A9A",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {tx(t.hero.badge)}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(3.5rem, 13vw, 7rem)",
              letterSpacing: "0.04em",
              color: "#F5F5F5",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            {tx(t.hero.title)}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              color: "#9A9A9A",
              marginBottom: 44,
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            {tx(t.hero.subtitle)}
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#4A6FFF",
                color: "#F5F5F5",
                padding: "15px 38px",
                fontFamily: "var(--font-bebas)",
                fontSize: "1.15rem",
                letterSpacing: "0.12em",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 150ms",
                minWidth: 160,
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
              {tx(t.hero.cta1)}
            </a>
            <a
              href="#about-section"
              style={{
                background: "transparent",
                color: "#F5F5F5",
                padding: "15px 38px",
                fontFamily: "var(--font-bebas)",
                fontSize: "1.15rem",
                letterSpacing: "0.12em",
                textDecoration: "none",
                border: "1px solid rgba(245,245,245,0.45)",
                display: "inline-block",
                transition: "all 150ms",
                minWidth: 160,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#F5F5F5";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,245,245,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,245,0.45)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {tx(t.hero.cta2)}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator"
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 1,
              height: 44,
              background: "linear-gradient(to bottom, transparent, #4A6FFF)",
            }}
          />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4A6FFF", marginTop: 2 }} />
        </div>
      </section>

      {/* ─── USP STRIP ─── */}
      <section
        style={{
          background: "#111111",
          borderTop: "1px solid #222",
          borderBottom: "1px solid #222",
          padding: "48px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 40,
            }}
          >
            {[
              { icon: "🏅", title: tx(t.usp.item1Title), sub: tx(t.usp.item1Sub) },
              { icon: "👥", title: tx(t.usp.item2Title), sub: tx(t.usp.item2Sub) },
              { icon: "⏱️", title: tx(t.usp.item3Title), sub: tx(t.usp.item3Sub) },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ borderLeft: "3px solid #4A6FFF", paddingLeft: 20 }}>
                  <div style={{ fontSize: "2rem", marginBottom: 10 }}>{item.icon}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "1.2rem",
                      letterSpacing: "0.06em",
                      color: "#F5F5F5",
                      marginBottom: 6,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "#9A9A9A", fontSize: "0.85rem" }}>{item.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about-section" style={{ padding: "88px 0", background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 64,
              alignItems: "center",
            }}
          >
            <ScrollReveal>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                <Image
                  src="/images/group-session.jpg"
                  alt="HYROX group session"
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

            <ScrollReveal delay={150}>
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
                CHANIA, CRETE · EST. 2024
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "0.04em",
                  color: "#F5F5F5",
                  lineHeight: 1.05,
                  marginBottom: 24,
                }}
              >
                {tx(t.about.title)}
              </h2>
              <p style={{ color: "#9A9A9A", fontSize: "1rem", lineHeight: 1.75, marginBottom: 32 }}>
                {tx(t.about.body)}
              </p>
              <Link
                href="/services"
                style={{
                  color: "#4A6FFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6B8FFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4A6FFF")}
              >
                {tx(t.about.link)}
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section style={{ padding: "80px 0", background: "#0D0D0D", overflow: "hidden" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <ScrollReveal>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontSize: "1.3rem", letterSpacing: 4, color: "#FFD700", marginBottom: 10 }}>
                  ★★★★★
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                    color: "#F5F5F5",
                    letterSpacing: "0.04em",
                  }}
                >
                  <span style={{ color: "#4A6FFF" }}>147</span> {tx(t.reviews.title)}
                </h2>
              </div>
              <a
                href={GOOGLE_MAPS_REVIEWS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#4A6FFF",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6B8FFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4A6FFF")}
              >
                {tx(t.reviews.readMore)}
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Infinite scroll carousel */}
        <div style={{ overflow: "hidden", paddingBottom: 8 }}>
          <div className="carousel-track">
            {doubled.map((review, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: "clamp(280px, 80vw, 340px)",
                  marginRight: 16,
                  background: "#1A1A1A",
                  border: "1px solid #222222",
                  padding: "24px 22px",
                }}
              >
                <div style={{ marginBottom: 12, fontSize: "0.85rem", color: "#FFD700", letterSpacing: 3 }}>
                  ★★★★★
                </div>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#F5F5F5",
                    marginBottom: 10,
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {review.name}
                </p>
                <p
                  style={{
                    color: "#9A9A9A",
                    fontSize: "0.815rem",
                    lineHeight: 1.65,
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {lang === "gr" ? review.text.gr : review.text.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATION ─── */}
      <section style={{ padding: "80px 0", background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "0.04em",
                color: "#F5F5F5",
                marginBottom: 52,
              }}
            >
              {tx(t.location.title)}
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 52,
              alignItems: "start",
            }}
          >
            <ScrollReveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  {
                    label: "ADDRESS",
                    content: (
                      <p style={{ color: "#F5F5F5", fontSize: "0.95rem" }}>📍 {tx(t.location.address)}</p>
                    ),
                  },
                  {
                    label: "PHONE",
                    content: (
                      <a href="tel:6989652119" style={{ color: "#F5F5F5", fontSize: "0.95rem", textDecoration: "none" }}>
                        📞 6989652119
                      </a>
                    ),
                  },
                  {
                    label: "INSTAGRAM",
                    content: (
                      <a
                        href="https://www.instagram.com/averagejoes.gym/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#F5F5F5", fontSize: "0.95rem", textDecoration: "none" }}
                      >
                        📸 @averagejoes.gym
                      </a>
                    ),
                  },
                ].map((row) => (
                  <div key={row.label} style={{ borderLeft: "3px solid #4A6FFF", paddingLeft: 16 }}>
                    <p
                      style={{
                        color: "#9A9A9A",
                        fontSize: "0.68rem",
                        letterSpacing: "0.2em",
                        marginBottom: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      {row.label}
                    </p>
                    {row.content}
                  </div>
                ))}

                <div style={{ borderLeft: "3px solid #4A6FFF", paddingLeft: 16 }}>
                  <p
                    style={{
                      color: "#9A9A9A",
                      fontSize: "0.68rem",
                      letterSpacing: "0.2em",
                      marginBottom: 12,
                      textTransform: "uppercase",
                    }}
                  >
                    {tx(t.location.hoursTitle)}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {hours.map((h) => (
                      <div
                        key={h.day}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 16,
                          paddingBottom: 8,
                          borderBottom: "1px solid #1a1a1a",
                        }}
                      >
                        <span style={{ color: "#9A9A9A", fontSize: "0.875rem" }}>{h.day}</span>
                        <span style={{ color: "#F5F5F5", fontSize: "0.875rem", fontWeight: 600 }}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div style={{ border: "1px solid #222222", overflow: "hidden" }}>
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="360"
                  style={{
                    border: 0,
                    display: "block",
                    filter: "grayscale(40%) contrast(1.1) invert(0.88) hue-rotate(180deg)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Average Joe's Gym map"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section
        style={{
          padding: "100px 20px",
          background: "#111111",
          textAlign: "center",
          borderTop: "1px solid #222",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            maxWidth: 600,
            maxHeight: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,111,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                color: "#4A6FFF",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              AVERAGE JOE&apos;S GYM · CHANIA, CRETE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
                letterSpacing: "0.04em",
                color: "#F5F5F5",
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              {tx(t.finalCta.title)}
            </h2>
            <p style={{ color: "#9A9A9A", fontSize: "1.05rem", marginBottom: 44 }}>
              {tx(t.finalCta.subtitle)}
            </p>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#4A6FFF",
                color: "#F5F5F5",
                padding: "16px 52px",
                fontFamily: "var(--font-bebas)",
                fontSize: "1.3rem",
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
              {tx(t.finalCta.cta)}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
