import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", labelKey: "nav-services" },
    { href: "#why-us", labelKey: "nav-why" },
    { href: "#process", labelKey: "nav-pricing" }, // Actually "How It Works" but we'll use this mapping
    { href: "#pricing", labelKey: "nav-pricing" },
    { href: "#testimonials", labelKey: "nav-testimonials" },
    { href: "#contact", labelKey: "nav-contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-0 ${
        isScrolled ? "bg-dark-900/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <a href="#" className="relative group" aria-label="Gavion Home">
            <img
              src="/GAVION_logo_transparent_4096w.png"
              alt="Gavion"
              width={320}
              height={100}
              className="h-24 w-auto transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {t(link.labelKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-white/20 hover:border-brand-500 hover:text-brand-500 transition-all"
              aria-label="Toggle language"
            >
              {t('lang-toggle')}
            </button>

            <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center px-5 py-2 bg-brand-500 text-white rounded-full text-sm font-semibold shadow-glow hover:bg-brand-600 transition-all"
            >
              {t('nav-cta')}
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2 bg-brand-500 text-white rounded-full text-sm font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav-cta')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
