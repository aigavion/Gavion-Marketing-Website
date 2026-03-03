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
    return (localStorage.getItem('gavion_lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('gavion_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = (key: string): string => {
    const translation = translations[lang][key as keyof typeof translations.en];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    // Replace <brand> tags with styled brand word (orange)
    const brandWord = lang === 'en' ? 'AI' : 'IA';
    return translation.replace(
      /<brand>/g,
      `<span class="text-brand-500">${brandWord}</span>`
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
