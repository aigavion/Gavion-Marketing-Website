import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-transparent border-t border-white/10 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img
              src="/GAVION_logo_transparent_4096w.png"
              alt="Gavion"
              width={160}
              height={50}
              className="h-12 w-auto"
            />
            <p className="text-white/60 text-sm mt-2">{t('footer-copyright')}</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-white/60 hover:text-brand-500 transition-colors">{t('footer-privacy')}</Link>
            <Link to="/terms" className="text-white/60 hover:text-brand-500 transition-colors">{t('footer-terms')}</Link>
            <a href="#" className="text-white/60 hover:text-brand-500 transition-colors">{t('footer-contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
