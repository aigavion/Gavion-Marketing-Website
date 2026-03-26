import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-transparent py-12">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent -mt-12 mb-12" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo + Copyright */}
          <div>
            <img
              src="/GAVION_logo_transparent_4096w.png"
              alt="Gavion"
              className="h-10 w-auto mb-3"
            />
            <p className="text-white/30 text-sm">{t('footer-copyright')}</p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-2 md:items-center">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">{t('footer-privacy')}</a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">{t('footer-terms')}</a>
          </div>

          {/* Contact Info */}
          <div className="md:text-right">
            <p className="text-white/40 text-sm">{t('contact-email')}</p>
            <p className="text-white/40 text-sm">{t('contact-phone')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
