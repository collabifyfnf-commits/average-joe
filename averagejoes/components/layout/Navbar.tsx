"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

const BOOK_URL = "https://members.averagejoes.gr/book.php";

const navLinks = [
  { href: "/", labelKey: "home" as const },
  { href: "/services", labelKey: "services" as const },
  { href: "/trainers", labelKey: "trainers" as const },
  { href: "/pricing", labelKey: "pricing" as const },
  { href: "/gallery", labelKey: "gallery" as const },
];

export default function Navbar() {
  const { lang, setLang, tx } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(13,13,13,0.97)" : "rgba(13,13,13,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #222222",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => setDrawerOpen(false)}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "1px solid #222",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Average Joe's Gym"
                width={44}
                height={44}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "1.15rem",
                letterSpacing: "0.08em",
                color: "#F5F5F5",
                lineHeight: 1,
              }}
            >
              AVERAGE JOE&apos;S
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  color: isActive(link.href) ? "#F5F5F5" : "#9A9A9A",
                  textDecoration: "none",
                  transition: "color 150ms",
                  fontWeight: isActive(link.href) ? 600 : 400,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive(link.href) ? "#F5F5F5" : "#9A9A9A")}
              >
                {tx(t.nav[link.labelKey])}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "gr" ? "en" : "gr")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                border: "1px solid #333",
                padding: "4px 8px",
                background: "transparent",
                color: "#9A9A9A",
                fontSize: "0.75rem",
                fontFamily: "var(--font-dm-sans)",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 150ms",
                height: 28,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#4A6FFF";
                (e.currentTarget as HTMLButtonElement).style.color = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#333";
                (e.currentTarget as HTMLButtonElement).style.color = "#9A9A9A";
              }}
              aria-label="Toggle language"
            >
              {lang === "gr" ? "🇬🇷 GR" : "🇬🇧 EN"}
            </button>

            {/* Book Now */}
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#4A6FFF",
                color: "#F5F5F5",
                padding: "8px 20px",
                fontFamily: "var(--font-bebas)",
                fontSize: "1rem",
                letterSpacing: "0.1em",
                textDecoration: "none",
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
              {tx(t.nav.bookNow)}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setDrawerOpen(true)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 8,
              color: "#F5F5F5",
            }}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setDrawerOpen(false)}
          style={{ background: "rgba(0,0,0,0.7)" }}
        />
      )}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          width: 280,
          background: "#0D0D0D",
          borderLeft: "1px solid #222",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          padding: "24px 24px 40px",
        }}
      >
        {/* Close */}
        <div className="flex justify-between items-center mb-8">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid #222",
            }}
          >
            <Image src="/images/logo.png" alt="Logo" width={36} height={36} style={{ objectFit: "cover" }} />
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9A9A9A" }}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "1.5rem",
                letterSpacing: "0.08em",
                color: isActive(link.href) ? "#F5F5F5" : "#9A9A9A",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid #1a1a1a",
                transition: "color 150ms",
              }}
            >
              {tx(t.nav[link.labelKey])}
            </Link>
          ))}
        </div>

        {/* Language toggle + Book Now */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => setLang(lang === "gr" ? "en" : "gr")}
            style={{
              border: "1px solid #333",
              background: "transparent",
              color: "#F5F5F5",
              padding: "10px 16px",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {lang === "gr" ? "🇬🇧 Switch to English" : "🇬🇷 Αλλαγή σε Ελληνικά"}
          </button>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDrawerOpen(false)}
            style={{
              background: "#4A6FFF",
              color: "#F5F5F5",
              padding: "14px 20px",
              fontFamily: "var(--font-bebas)",
              fontSize: "1.2rem",
              letterSpacing: "0.1em",
              textDecoration: "none",
              textAlign: "center",
              display: "block",
            }}
          >
            {tx(t.nav.bookNow)}
          </a>
        </div>
      </div>
    </>
  );
}
