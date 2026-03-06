import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setSubmitMessage(data.message);
        setFormData({ name: "", email: "", organization: "", message: "" });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent">
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

          {submitStatus === "success" && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl mb-6 text-center">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="font-medium">{submitMessage}</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl mb-6 text-center">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <p className="font-medium">{submitMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-dark-800 rounded-2xl p-8 shadow-soft border border-white/5 reveal" style={{ animationDelay: "0.3s" }}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">{t('contact-form-name')}</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" 
                  placeholder={t('contact-form-placeholder-name')} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">{t('contact-form-email')}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" 
                  placeholder={t('contact-form-placeholder-email')} 
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">{t('contact-form-company')}</label>
              <input 
                type="text" 
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" 
                placeholder={t('contact-form-placeholder-company')} 
              />
              <input 
                type="text" 
                name="company"
                className="honeypot"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">{t('contact-form-message')}</label>
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" 
                placeholder={t('contact-form-placeholder-message')}
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-brand-500 text-white rounded-full font-semibold hover:bg-brand-600 transition-all duration-300 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                t('contact-submit')
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
