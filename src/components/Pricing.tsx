import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Calculator } from "lucide-react";

const plans = [
  {
    nameKey: "plan-1-name",
    descKey: "plan-1-desc",
    price: 249,
    setupFeeKey: "plan-1-setup",
    featuresKeys: ["plan-1-1", "plan-1-2", "plan-1-3", "plan-1-4", "plan-1-5", "plan-1-6"],
    highlighted: false,
    buttonTextKey: "get-started",
    recoveryRate: 0.15,
  },
  {
    nameKey: "plan-2-name",
    descKey: "plan-2-desc",
    price: 449,
    setupFeeKey: "plan-2-setup",
    featuresKeys: ["plan-2-1", "plan-2-2", "plan-2-3", "plan-2-4", "plan-2-5", "plan-2-6", "plan-2-7", "plan-2-8"],
    highlighted: true,
    buttonTextKey: "get-started",
    recoveryRate: 0.30,
  },
  {
    nameKey: "plan-3-name",
    descKey: "plan-3-desc",
    price: 999,
    setupFeeKey: "plan-3-setup",
    featuresKeys: ["plan-3-1", "plan-3-2", "plan-3-3", "plan-3-4", "plan-3-5", "plan-3-6", "plan-3-7", "plan-3-8"],
    highlighted: false,
    buttonTextKey: "get-started",
    recoveryRate: 0.45,
  },
];

function MiniRoiCalculator({ recoveryRate, planPrice, lang }: { recoveryRate: number; planPrice: number; lang: string }) {
  const [pricePerJob, setPricePerJob] = useState(200);
  const [missedCalls, setMissedCalls] = useState(20);

  const recoveredRevenue = Math.round(missedCalls * recoveryRate * pricePerJob);
  const roi = recoveredRevenue - planPrice;

  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-4 h-4 text-orange-400" />
        <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
          {lang === 'fr' ? 'Calculateur ROI' : 'ROI Calculator'}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>{lang === 'fr' ? 'Prix par contrat' : 'Price per job'}</span>
            <span className="text-white font-medium">${pricePerJob}</span>
          </div>
          <input
            type="range"
            min={50}
            max={5000}
            step={50}
            value={pricePerJob}
            onChange={(e) => setPricePerJob(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-orange-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow-glow [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-none"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>{lang === 'fr' ? 'Appels manqués / mois' : 'Missed calls / month'}</span>
            <span className="text-white font-medium">{missedCalls}</span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={missedCalls}
            onChange={(e) => setMissedCalls(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-orange-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow-glow [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-none"
          />
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5">
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>{lang === 'fr' ? 'Revenus récupérés' : 'Recovered revenue'}</span>
          <span className="text-white font-medium">${recoveredRevenue.toLocaleString()}{lang === 'fr' ? '/mois' : '/mo'}</span>
        </div>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
          <span className="text-xs font-semibold text-white">
            {lang === 'fr' ? 'ROI potentiel' : 'Potential ROI'}
          </span>
          <span className={`text-lg font-extrabold ${roi > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {roi > 0 ? '+' : ''}{lang === 'fr' ? '' : ''}${roi.toLocaleString()}{lang === 'fr' ? '/mois' : '/mo'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const { t, lang } = useLanguage();

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t('pricing-title')}</h2>
          <p className="text-lg text-white/60">{t('pricing-subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border transition-all duration-300 reveal ${
                plan.highlighted
                  ? "lg:scale-105"
                  : "bg-surface/60 backdrop-blur-sm border-white/5 hover:border-white/10"
              } ${plan.highlighted ? "gradient-border-animated" : ""}`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full z-10">
                  {t('most-popular')}
                </div>
              )}
              <div className={`relative z-10 p-5 sm:p-8 ${plan.highlighted ? "bg-surface rounded-2xl" : ""}`}>
                <h3 className="text-2xl font-bold text-white mb-2">{t(plan.nameKey)}</h3>
                <p className="text-white/40 text-sm mb-6">{t(plan.descKey)}</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold gradient-text">${plan.price}</span>
                  <span className="text-white/40"> {t('per-month-cad')}</span>
                </div>
                <p className="text-sm text-white/40 mb-6">{t(plan.setupFeeKey)}</p>
                <ul className="space-y-3 mb-8">
                  {plan.featuresKeys.map((key, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
                      <Check className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block w-full text-center py-3.5 rounded-full font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:shadow-glow-lg"
                      : "border-2 border-orange-500/50 text-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:text-white hover:border-transparent"
                  }`}
                >
                  {t(plan.buttonTextKey)}
                </a>

                <MiniRoiCalculator
                  recoveryRate={plan.recoveryRate}
                  planPrice={plan.price}
                  lang={lang}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
