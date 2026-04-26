import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://average-joes-gym.gr"),
  title: "Average Joe's Gym | Χανιά — HYROX & Group Training",
  description:
    "Το πρώτο HYROX affiliate club στα Χανιά. Μικρές ομάδες, expert προπονητές, premium εξοπλισμός. Κλείσε θέση σήμερα.",
  keywords: ["gym", "Chania", "Χανιά", "HYROX", "group training", "fitness", "Average Joe's Gym"],
  openGraph: {
    title: "Average Joe's Gym | Χανιά — HYROX & Group Training",
    description: "Πρώτο HYROX Affiliate Club στα Χανιά. Μικρές ομάδες, expert coaches, premium εξοπλισμός.",
    url: "https://average-joes-gym.gr",
    siteName: "Average Joe's Gym",
    images: [{ url: "/images/logo.png", width: 512, height: 512 }],
    locale: "el_GR",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body style={{ background: "#0A0A0A", color: "#F5F5F5", minHeight: "100vh" }}>
        <LanguageProvider>
          <Navbar />
          <main style={{ paddingTop: 64 }}>{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
