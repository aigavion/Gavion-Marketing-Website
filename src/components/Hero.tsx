import { useLanguage } from "@/contexts/LanguageContext";

const initialMessages = [
  { from: "bot", textKey: "chat-1" },
  { from: "user", textKey: "chat-user-1" },
  { from: "bot", textKey: "chat-2" },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark-900/50 backdrop-blur-sm"></div>
      
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-500 text-xs font-semibold uppercase tracking-wide mb-6">
              {t('hero-badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6" dangerouslySetInnerHTML={{ __html: t('hero-title') }}>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero-subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 text-white rounded-full font-semibold shadow-glow hover:bg-brand-600 transition-all"
              >
                {t('hero-cta-primary')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 hover:shadow-soft transition-all"
              >
                {t('hero-cta-secondary')}
              </a>
            </div>
          </div>

          {/* Animated Chat Demo */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-dark rounded-2xl p-1 shadow-soft transform lg:translate-x-8">
              <div className="bg-dark-800/80 backdrop-blur rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-dark-900/50 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full pulse-dot"></div>
                    <span className="text-white font-medium text-sm">{t('chat-header')}</span>
                  </div>
                  <span className="text-xs text-white/60">{t('chat-status')}</span>
                </div>
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-dark-900/30" id="chat-demo">
                  {initialMessages.map((msg, idx) => (
                    <div key={idx} className={`flex items-start gap-3 ${msg.from === "user" ? "justify-end" : ""}`}>
                      {msg.from === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">G</div>
                      )}
                      <div className={`rounded-2xl p-3 max-w-[85%] text-sm leading-relaxed ${msg.from === "bot" ? "bg-white/10 text-white rounded-tl-none" : "bg-brand-600 text-white rounded-tr-none"}`}>
                        {t(msg.textKey)}
                      </div>
                      {msg.from === "user" && (
                        <div className="w-8 h-8 rounded-full bg-dark-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">U</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-dark-800/50 border-t border-white/5">
                  <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                      placeholder={t('chat-placeholder')}
                      readOnly
                    />
                    <button className="bg-brand-500 hover:bg-brand-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-glow">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
