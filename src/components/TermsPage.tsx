import { useLanguage } from "@/contexts/LanguageContext";

const sections: { key: string; isIntro?: boolean; contentKey?: string }[] = [
  { key: "terms-intro", isIntro: true },
  { key: "terms-section-1-title", contentKey: "terms-section-1-content" },
  { key: "terms-section-2-title", contentKey: "terms-section-2-content" },
  { key: "terms-section-3-title", contentKey: "terms-section-3-content" },
  { key: "terms-section-4-title", contentKey: "terms-section-4-content" },
  { key: "terms-section-5-title", contentKey: "terms-section-5-content" },
  { key: "terms-section-6-title", contentKey: "terms-section-6-content" },
  { key: "terms-section-7-title", contentKey: "terms-section-7-content" },
  { key: "terms-section-8-title", contentKey: "terms-section-8-content" },
  { key: "terms-section-9-title", contentKey: "terms-section-9-content" },
  { key: "terms-section-10-title", contentKey: "terms-section-10-content" },
  { key: "terms-section-11-title", contentKey: "terms-section-11-content" },
  { key: "terms-section-12-title", contentKey: "terms-section-12-content" },
  { key: "terms-section-13-title", contentKey: "terms-section-13-content" },
  { key: "terms-section-14-title", contentKey: "terms-section-14-content" },
  { key: "terms-section-15-title", contentKey: "terms-section-15-content" },
  { key: "terms-section-16-title", contentKey: "terms-section-16-content" },
  { key: "terms-section-17-title", contentKey: "terms-section-17-content" },
  { key: "terms-section-18-title", contentKey: "terms-section-18-content" },
  { key: "terms-section-19-title", contentKey: "terms-section-19-content" },
  { key: "terms-section-20-title", contentKey: "terms-section-20-content" },
  { key: "terms-section-21-title", contentKey: "terms-section-21-content" },
  { key: "terms-section-22-title", contentKey: "terms-section-22-content" },
  { key: "terms-section-23-title", contentKey: "terms-section-23-content" },
  { key: "terms-section-24-title", contentKey: "terms-section-24-content" },
  { key: "terms-section-25-title", contentKey: "terms-section-25-content" },
];

const TermsPage = () => {
  const { t } = useLanguage();

  return (
    <main className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {t("terms-title")}
        </h1>
        <p className="text-white/60 text-center mb-12">{t("terms-effective-date")}</p>

        <div className="space-y-8">
          {sections.map((section, index) => {
            if (section.isIntro) {
              return (
                <div key={index} className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10">
                  <p className="text-white/80 leading-relaxed whitespace-pre-line">
                    {t("terms-intro")}
                  </p>
                  <p className="text-white/80 leading-relaxed whitespace-pre-line mt-4">
                    {t("terms-intro-2")}
                  </p>
                </div>
              );
            }

            return (
              <div key={index} className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-xl font-semibold text-brand-500 mb-4">
                  {t(section.key)}
                </h2>
                <div className="text-white/80 leading-relaxed whitespace-pre-line">
                  {t(section.contentKey!)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
