import { useLanguage } from "@/contexts/LanguageContext";

const plans = [
  {
    nameKey: "plan-1-name",
    descKey: "plan-1-desc",
    price: 199,
    setupFeeKey: "plan-1-setup",
    featuresKeys: ["plan-1-1", "plan-1-2", "plan-1-3", "plan-1-4", "plan-1-5", "plan-1-6", "plan-1-7"],
    highlighted: false,
    buttonTextKey: "get-started",
  },
  {
    nameKey: "plan-2-name",
    descKey: "plan-2-desc",
    price: 399,
    setupFeeKey: "plan-2-setup",
    featuresKeys: ["plan-2-1", "plan-2-2", "plan-2-3", "plan-2-4", "plan-2-5", "plan-2-6", "plan-2-7"],
    highlighted: true,
    buttonTextKey: "get-started",
  },
  {
    nameKey: "plan-3-name",
    descKey: "plan-3-desc",
    price: 799,
    setupFeeKey: "plan-3-setup",
    featuresKeys: ["plan-3-1", "plan-3-2", "plan-3-3", "plan-3-4", "plan-3-5", "plan-3-6", "plan-3-7"],
    highlighted: false,
    buttonTextKey: "contact-sales",
  },
];

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('pricing-title')}</h2>
          <p className="text-lg text-white/70">{t('pricing-subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card bg-dark-800 rounded-2xl p-10 border ${
                plan.highlighted
                  ? "border-brand-500 relative transform md:scale-105 shadow-glow"
                  : "border-white/10"
              } reveal`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{t(plan.nameKey)}</h3>
              <p className="text-white/60 text-sm mb-6">{t(plan.descKey)}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-brand-500">${plan.price}</span>
                <span className="text-white/60"> {t('per-month')}</span>
              </div>
              <p className="text-sm text-white/60 mt-2">{t(plan.setupFeeKey)}</p>
              <ul className="space-y-3 mb-8 text-sm text-white/70">
                {plan.featuresKeys.map((key, idx) => (
                  <li key={idx}>{t(key)}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block w-full text-center py-3.5 rounded-full ${
                  plan.highlighted
                    ? "bg-brand-500 text-white hover:bg-brand-600 transition-all duration-300 shadow-glow"
                    : "border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white transition-all duration-300"
                }`}
              >
                {t(plan.buttonTextKey)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
