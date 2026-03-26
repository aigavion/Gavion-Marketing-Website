import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Zap, Heart, TrendingUp, Lock, Rocket } from "lucide-react";

const stats = [
  { value: "7 days", key: "stat-deploy" },
  { value: "100%", key: "stat-custom" },
  { value: "24/7", key: "stat-support" },
];

const valueProps = [
  { icon: Zap, titleKey: "vp-1-title", descKey: "vp-1-desc" },
  { icon: Shield, titleKey: "vp-2-title", descKey: "vp-2-desc" },
  { icon: Heart, titleKey: "vp-3-title", descKey: "vp-3-desc" },
  { icon: Rocket, titleKey: "vp-4-title", descKey: "vp-4-desc" },
];

const trustBadges = [
  { name: "PIPEDA", key: "trust-pipeda" },
  { name: "Loi 25", key: "trust-law25" },
];

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-full text-sm font-medium mb-6">
            <Rocket className="w-4 h-4 text-orange-400" />
            <span className="gradient-text">{t('why-badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {t('why-title')}
          </h2>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            {t('why-subtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-surface/60 rounded-2xl border border-white/5 reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-5xl font-extrabold gradient-text mb-2">{stat.value}</div>
              <div className="text-white/50 text-sm">{t(stat.key)}</div>
            </div>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          {/* Card 1 — tall, spans 2 rows */}
          <div className="lg:row-span-2 group p-8 bg-surface/60 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 reveal">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t(valueProps[0].titleKey)}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t(valueProps[0].descKey)}</p>
          </div>

          {/* Card 2 */}
          <div className="group p-6 bg-surface/60 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 reveal" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t(valueProps[1].titleKey)}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t(valueProps[1].descKey)}</p>
          </div>

          {/* Card 3 */}
          <div className="group p-6 bg-surface/60 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 reveal" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t(valueProps[2].titleKey)}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t(valueProps[2].descKey)}</p>
          </div>

          {/* Card 4 — wide, spans 2 cols */}
          <div className="md:col-span-2 group p-6 bg-surface/60 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 reveal" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{t(valueProps[3].titleKey)}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{t(valueProps[3].descKey)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-16 reveal">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">{t('why-trust-title')}</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-surface/40 rounded-full border border-white/10">
                <Lock className="w-4 h-4 text-orange-400" />
                <span className="text-white font-medium text-sm">{badge.name}</span>
                <span className="text-white/30 text-sm">|</span>
                <span className="text-white/50 text-sm">{t(badge.key)}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-sm mt-4">
            {t('why-trust-subtitle')}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-orange-400/10 rounded-full border border-orange-500/30">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-medium">{t('why-cta-text')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
