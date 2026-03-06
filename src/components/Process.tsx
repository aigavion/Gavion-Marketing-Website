import { useLanguage } from "@/contexts/LanguageContext";
import { ThreeDCardCarousel } from "@/components/ui/ThreeDCardCarousel";

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
    <section id="process" className="py-24 bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('process-title')}</h2>
          <p className="text-lg text-white/70">{t('process-subtitle')}</p>
        </div>

        <ThreeDCardCarousel steps={steps} />
      </div>
    </section>
  );
}
