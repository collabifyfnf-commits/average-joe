"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tx: (obj: { gr: string; en: string }) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("gr");

  const tx = (obj: { gr: string; en: string }) => obj[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, tx }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
