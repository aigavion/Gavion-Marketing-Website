import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    titleKey: "feature-1-title",
    descKey: "feature-1-desc",
  },
  {
    icon: Zap,
    titleKey: "feature-2-title",
    descKey: "feature-2-desc",
  },
  {
    icon: Heart,
    titleKey: "feature-3-title",
    descKey: "feature-3-desc",
  },
];

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="py-24 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('why-title')}</h2>
          <p className="text-lg text-white/70 leading-relaxed">{t('why-subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center reveal" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey)}</h3>
              <p className="text-white/70 text-sm">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
