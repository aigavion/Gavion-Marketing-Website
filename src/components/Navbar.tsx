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
    { path: "#process", labelKey: "nav-pricing", isRoute: false },
    { path: "#pricing", labelKey: "nav-pricing", isRoute: false },
    { path: "#testimonials", labelKey: "nav-testimonials", isRoute: false },
    { path: "#contact", labelKey: "nav-contact", isRoute: false },
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      window.location.href = '/#/' + path.substring(1);
    } else {
      navigate(path);
    }
  };

  

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-0 ${
        isScrolled ? "bg-dark-900/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="relative group bg-transparent border-none cursor-pointer" aria-label="Gavion Home">
            <img
              src="/GAVION_logo_transparent_4096w.png"
              alt="Gavion"
              width={320}
              height={100}
              className="h-24 w-auto transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-sm font-medium transition-colors relative group ${link.isRoute && location.pathname === link.path ? 'text-white' : 'text-white/70 hover:text-white'} bg-transparent border-none cursor-pointer`}
              >
                {t(link.labelKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full" style={{ width: link.isRoute && location.pathname === link.path ? '100%' : undefined }}></span>
              </button>
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

            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:inline-flex items-center justify-center px-5 py-2 bg-brand-500 text-white rounded-full text-sm font-semibold shadow-glow hover:bg-brand-600 transition-all border-none cursor-pointer"
            >
              {t('nav-cta')}
            </button>

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
                <button
                  key={link.path}
                  onClick={() => {
                    handleNavClick(link.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors text-left bg-transparent border-none cursor-pointer"
                >
                  {t(link.labelKey)}
                </button>
              ))}
              <button
                onClick={() => {
                  handleNavClick('#contact');
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex items-center justify-center px-5 py-2 bg-brand-500 text-white rounded-full text-sm font-semibold border-none cursor-pointer"
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
