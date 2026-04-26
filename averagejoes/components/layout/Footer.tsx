"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

export default function Footer() {
  const { tx, lang } = useLang();

  const hours = lang === "gr" ? t.location.hours.gr : t.location.hours.en;

  return (
    <footer
      style={{
        background: "#0D0D0D",
        borderTop: "1px solid #222222",
        padding: "60px 0 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            paddingBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid #222",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Average Joe's Gym"
                  width={48}
                  height={48}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "1.1rem",
                  letterSpacing: "0.06em",
                  color: "#F5F5F5",
                }}
              >
                AVERAGE JOE&apos;S GYM
              </span>
            </div>
            <p
              style={{
                color: "#9A9A9A",
                fontSize: "0.875rem",
                fontFamily: "var(--font-bebas)",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              {tx(t.footer.tagline)}
            </p>
            <a
              href="https://www.instagram.com/averagejoes.gym/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#9A9A9A",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @averagejoes.gym
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "1rem",
                letterSpacing: "0.12em",
                color: "#F5F5F5",
                marginBottom: 20,
              }}
            >
              {tx(t.footer.quickLinks)}
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/", label: tx(t.nav.home) },
                { href: "/services", label: tx(t.nav.services) },
                { href: "/trainers", label: tx(t.nav.trainers) },
                { href: "/pricing", label: tx(t.nav.pricing) },
                { href: "/gallery", label: tx(t.nav.gallery) },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "#9A9A9A",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "1rem",
                letterSpacing: "0.12em",
                color: "#F5F5F5",
                marginBottom: 20,
              }}
            >
              {tx(t.footer.contact)}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=Average+Joe%27s+Gym+Chania"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#9A9A9A", fontSize: "0.875rem", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
              >
                📍 {tx(t.location.address)}
              </a>
              <a
                href="tel:6989652119"
                style={{ color: "#9A9A9A", fontSize: "0.875rem", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
              >
                📞 6989652119
              </a>
              <a
                href="https://wa.me/306989652119"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#9A9A9A", fontSize: "0.875rem", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#25D366")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "1rem",
                letterSpacing: "0.12em",
                color: "#F5F5F5",
                marginBottom: 20,
              }}
            >
              {tx(t.footer.hours)}
            </h4>
            <div className="flex flex-col gap-2">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span style={{ color: "#9A9A9A", fontSize: "0.8rem" }}>{h.day}</span>
                  <span style={{ color: "#F5F5F5", fontSize: "0.8rem", fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #222222",
            padding: "20px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ color: "#666", fontSize: "0.75rem" }}>{tx(t.footer.copyright)}</span>
          <span style={{ color: "#666", fontSize: "0.75rem" }}>{tx(t.footer.madeWith)}</span>
        </div>
      </div>
    </footer>
  );
}
