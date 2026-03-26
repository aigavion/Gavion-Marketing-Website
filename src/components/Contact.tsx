import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left — Info */}
          <div className="reveal">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t('contact-title')}</h2>
            <p className="text-lg text-white/60 mb-10">{t('contact-subtitle')}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-surface/60 rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{t('contact-email-label')}</h3>
                  <p className="text-white/50 text-sm">{t('contact-email')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-surface/60 rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{t('contact-phone-label')}</h3>
                  <p className="text-white/50 text-sm">{t('contact-phone')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal" style={{ animationDelay: "0.2s" }}>
            {submitStatus === "success" && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-xl mb-6 text-center">
                <p className="font-medium">{submitMessage}</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl mb-6 text-center">
                <p className="font-medium">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-surface/60 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">{t('contact-form-name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-base border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder={t('contact-form-placeholder-name')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">{t('contact-form-email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-base border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder={t('contact-form-placeholder-email')}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/50 mb-2">{t('contact-form-company')}</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-base border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
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
                <label className="block text-sm font-medium text-white/50 mb-2">{t('contact-form-message')}</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-base border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none"
                  placeholder={t('contact-form-placeholder-message')}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full font-semibold hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
      </div>
    </section>
  );
}
