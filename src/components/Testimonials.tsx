import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    nameKey: "testimonial-1-name",
    roleKey: "testimonial-1-role",
    initial: "SM",
    textKey: "testimonial-1-text",
  },
  {
    nameKey: "testimonial-2-name",
    roleKey: "testimonial-2-role",
    initial: "LT",
    textKey: "testimonial-2-text",
  },
  {
    nameKey: "testimonial-3-name",
    roleKey: "testimonial-3-role",
    initial: "JD",
    textKey: "testimonial-3-text",
  },
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-24 bg-dark-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('testimonials-title')}</h2>
          <p className="text-lg text-white/70">{t('testimonials-subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-dark-700 rounded-2xl p-8 shadow-soft border border-white/5 reveal"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="flex mb-4 text-brand-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-white/80 text-sm leading-relaxed mb-6">
                {t(testimonial.textKey)}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.initial}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t(testimonial.nameKey)}</p>
                  <p className="text-xs text-white/60">{t(testimonial.roleKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
