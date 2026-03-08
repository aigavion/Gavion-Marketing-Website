import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Zap, Heart, TrendingUp, Lock, Rocket } from "lucide-react";

const stats = [
  { value: "7 days", key: "stat-deploy" },
  { value: "100%", key: "stat-custom" },
  { value: "24/7", key: "stat-support" },
];

const valueProps = [
  {
    icon: Zap,
    titleKey: "vp-1-title",
    descKey: "vp-1-desc",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    titleKey: "vp-2-title",
    descKey: "vp-2-desc",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Heart,
    titleKey: "vp-3-title",
    descKey: "vp-3-desc",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Rocket,
    titleKey: "vp-4-title",
    descKey: "vp-4-desc",
    color: "from-orange-500 to-red-500",
  },
];

const trustBadges = [
  { name: "PIPEDA", key: "trust-pipeda" },
  { name: "Loi 25", key: "trust-law25" },
];

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="py-24 bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 rounded-full text-brand-400 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            {t('why-badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t('why-title')}
          </h2>
          <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            {t('why-subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-dark-800/50 rounded-2xl border border-white/5 reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-4xl md:text-5xl font-bold text-brand-500 mb-2">{stat.value}</div>
              <div className="text-white/60 text-sm">{t(stat.key)}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto">
          {valueProps.map((vp, index) => (
            <div key={index} className="group p-6 bg-dark-800/50 rounded-2xl border border-white/5 hover:border-brand-500/30 transition-all duration-300 reveal" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${vp.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <vp.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t(vp.titleKey)}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t(vp.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="mb-20 reveal">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('why-trust-title')}</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-lg border border-white/10">
                <Lock className="w-4 h-4 text-brand-500" />
                <span className="text-white font-medium">{badge.name}</span>
                <span className="text-white/50 text-sm">•</span>
                <span className="text-white/60 text-sm">{t(badge.key)}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-6">
            {t('why-trust-subtitle')}
          </p>
        </div>

        <div className="text-center reveal">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-brand-500/10 rounded-full border border-brand-500/30">
            <TrendingUp className="w-5 h-5 text-brand-500" />
            <span className="text-brand-400 font-medium">{t('why-cta-text')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
