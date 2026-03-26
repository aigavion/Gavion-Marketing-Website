import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  { number: "1", titleKey: "step-1-title", descKey: "step-1-desc" },
  { number: "2", titleKey: "step-2-title", descKey: "step-2-desc" },
  { number: "3", titleKey: "step-3-title", descKey: "step-3-desc" },
];

export default function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t('process-title')}</h2>
          <p className="text-lg text-white/60">{t('process-subtitle')}</p>
        </div>

        <div className="max-w-4xl mx-auto reveal">
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
            {/* Progress line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 z-0" />

            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center text-center relative z-10">
                {/* Number circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-glow">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t(step.titleKey)}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
