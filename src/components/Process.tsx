import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    number: "1",
    titleKey: "step-1-title",
    descKey: "step-1-desc",
  },
  {
    number: "2",
    titleKey: "step-2-title",
    descKey: "step-2-desc",
  },
  {
    number: "3",
    titleKey: "step-3-title",
    descKey: "step-3-desc",
  },
];

export default function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-24 bg-dark-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('process-title')}</h2>
          <p className="text-lg text-white/70">{t('process-subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center reveal" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 w-14 h-14 bg-brand-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-glow">
                {step.number}
              </div>
              <div className="mt-12 bg-dark-700 rounded-2xl p-8 shadow-soft border border-white/5 h-full">
                <h3 className="text-xl font-semibold mb-3">{t(step.titleKey)}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{t(step.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
