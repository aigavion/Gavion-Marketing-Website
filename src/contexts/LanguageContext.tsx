import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/lib/translations';

type Language = 'en' | 'fr';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    // Check localStorage on mount, default to 'en'
    const saved = localStorage.getItem('gavion_lang');
    return (saved === 'en' || saved === 'fr') ? (saved as Language) : 'en';
  });

  useEffect(() => {
    localStorage.setItem('gavion_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = (key: string): string => {
    // Guard against invalid language
    const langTranslations = translations[lang];
    if (!langTranslations) {
      console.warn(`Invalid language: ${lang}, falling back to English`);
      // Fallback to English
      const fallback = translations.en[key as keyof typeof translations.en];
      if (!fallback) {
        console.warn(`Missing translation for key: ${key} in English`);
        return key;
      }
      // Replace <brand> tags with styled brand word (orange)
      return fallback.replace(
        /<brand>/g,
        `<span class="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">AI</span>`
      );
    }

    const translation = langTranslations[key as keyof typeof translations.en];
    if (!translation) {
      console.warn(`Missing translation for key: ${key} in ${lang}`);
      return key;
    }
    // Replace <brand> tags with styled brand word (orange)
    const brandWord = lang === 'en' ? 'AI' : 'IA';
    return translation.replace(
      /<brand>/g,
      `<span class="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">${brandWord}</span>`
    );
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
