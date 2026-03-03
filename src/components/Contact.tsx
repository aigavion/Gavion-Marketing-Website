import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('contact-title')}</h2>
          <p className="text-lg text-white/70">{t('contact-subtitle')}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center reveal" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contact-email-label')}</h3>
              <p className="text-white/70">{t('contact-email')}</p>
            </div>
            <div className="text-center reveal" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contact-phone-label')}</h3>
              <p className="text-white/70">{t('contact-phone')}</p>
            </div>
          </div>

          <form className="bg-dark-800 rounded-2xl p-8 shadow-soft border border-white/5 reveal" style={{ animationDelay: "0.3s" }}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">{t('contact-form-name')}</label>
                <input type="text" className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" placeholder={t('contact-form-placeholder-name')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">{t('contact-form-email')}</label>
                <input type="email" className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" placeholder={t('contact-form-placeholder-email')} />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">{t('contact-form-company')}</label>
              <input type="text" className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" placeholder={t('contact-form-placeholder-company')} />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">{t('contact-form-message')}</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" placeholder={t('contact-form-placeholder-message')}></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-brand-500 text-white rounded-full font-semibold hover:bg-brand-600 transition-all duration-300 shadow-glow">
              {t('contact-submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
