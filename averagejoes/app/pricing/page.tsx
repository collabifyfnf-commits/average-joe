"use client";

import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import ScrollReveal from "@/components/ui/ScrollReveal";

const BOOK_URL = "https://members.averagejoes.gr/book.php";

export default function PricingPage() {
  const { tx } = useLang();
  const packages = t.pricing.packages;

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
              marginBottom: 14,
            }}
          >
            {tx(t.pricing.heroTitle)}
          </h1>
          <p style={{ color: "#9A9A9A", fontSize: "1rem" }}>{tx(t.pricing.heroSub)}</p>
        </div>
      </section>

      {/* ─── PACKAGES GRID ─── */}
      <section style={{ padding: "80px 0", background: "#0A0A0A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {packages.map((pkg, i) => {
              const isPopular = pkg.popular;
              return (
                <ScrollReveal key={i} delay={i * 60}>
                  <div
                    style={{
                      background: "#111111",
                      border: isPopular ? "2px solid #4A6FFF" : "1px solid #222222",
                      padding: "28px 24px",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div
                        style={{
                          position: "absolute",
                          top: -1,
                          right: 20,
                          background: "#4A6FFF",
                          color: "#F5F5F5",
                          padding: "4px 14px",
                          fontSize: "0.65rem",
                          letterSpacing: "0.18em",
                          fontFamily: "var(--font-bebas)",
                        }}
                      >
                        {tx(t.pricing.popular)}
                      </div>
                    )}

                    {/* Package name */}
                    <h3
                      style={{
                        fontFamily: "var(--font-bebas)",
                        fontSize: "1.6rem",
                        letterSpacing: "0.06em",
                        color: "#F5F5F5",
                        marginBottom: 8,
                        marginTop: isPopular ? 8 : 0,
                      }}
                    >
                      {tx(pkg.name)}
                    </h3>

                    {/* Duration */}
                    <span
                      style={{
                        display: "inline-block",
                        background: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                        color: "#9A9A9A",
                        padding: "3px 10px",
                        fontSize: "0.72rem",
                        letterSpacing: "0.12em",
                        marginBottom: 20,
                        textTransform: "uppercase",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {tx(pkg.duration)}
                    </span>

                    {/* Price */}
                    <div style={{ marginBottom: 24 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-bebas)",
                          fontSize: "3rem",
                          color: "#4A6FFF",
                          letterSpacing: "0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {pkg.price}
                      </span>
                    </div>

                    {/* Includes */}
                    <div style={{ flex: 1, marginBottom: 28 }}>
                      <p
                        style={{
                          fontSize: "0.68rem",
                          letterSpacing: "0.15em",
                          color: "#9A9A9A",
                          textTransform: "uppercase",
                          marginBottom: 10,
                          fontFamily: "var(--font-dm-sans)",
                        }}
                      >
                        {tx(t.pricing.includes)}
                      </p>
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            background: "#4A6FFF",
                            flexShrink: 0,
                            marginTop: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1 4.5L3.5 7L8 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span style={{ color: "#F5F5F5", fontSize: "0.875rem", lineHeight: 1.5 }}>
                          {tx(pkg.includes)}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={BOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: isPopular ? "#4A6FFF" : "transparent",
                        color: "#F5F5F5",
                        border: isPopular ? "none" : "1px solid #333",
                        padding: "12px 20px",
                        fontFamily: "var(--font-bebas)",
                        fontSize: "1rem",
                        letterSpacing: "0.12em",
                        textDecoration: "none",
                        display: "block",
                        textAlign: "center",
                        transition: "all 150ms",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#4A6FFF";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#4A6FFF";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = isPopular ? "#4A6FFF" : "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = isPopular ? "none" : "#333";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                      }}
                    >
                      {tx(t.pricing.cta)}
                    </a>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Note */}
          <ScrollReveal>
            <div
              style={{
                marginTop: 48,
                background: "#111111",
                border: "1px solid #222",
                borderLeft: "3px solid #4A6FFF",
                padding: "16px 20px",
              }}
            >
              <p style={{ color: "#9A9A9A", fontSize: "0.875rem" }}>
                💬 {tx(t.pricing.note)}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
