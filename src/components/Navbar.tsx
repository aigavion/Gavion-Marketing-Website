import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/services", labelKey: "nav-services", isRoute: true },
    { path: "#why-us", labelKey: "nav-why", isRoute: false },
    { path: "#process", labelKey: "nav-process", isRoute: false },
    { path: "#pricing", labelKey: "nav-pricing", isRoute: false },
    { path: "#contact", labelKey: "nav-contact", isRoute: false },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        const targetId = path.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base/90 backdrop-blur-xl border-b border-white/10"
          : "bg-base/70 backdrop-blur-xl"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate('/')} className="relative group bg-transparent border-none cursor-pointer" aria-label="Gavion Home">
            <img
              src="/GAVION_logo_transparent_4096w.png"
              alt="Gavion"
              className="h-14 w-auto transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-sm font-medium transition-colors relative group bg-transparent border-none cursor-pointer ${
                  link.isRoute && location.pathname === link.path
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {t(link.labelKey)}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-opacity ${
                    link.isRoute && location.pathname === link.path
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all bg-transparent cursor-pointer"
              aria-label="Toggle language"
            >
              {t('lang-toggle')}
            </button>

            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all border-none cursor-pointer"
            >
              {t('nav-cta')}
            </button>

            <button
              className="md:hidden text-white bg-transparent border-none cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors text-left bg-transparent border-none cursor-pointer"
                >
                  {t(link.labelKey)}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full text-sm font-semibold border-none cursor-pointer"
              >
                {t('nav-cta')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
