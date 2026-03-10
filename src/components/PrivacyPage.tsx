import { useLanguage } from "@/contexts/LanguageContext";

const sections: { key: string; isIntro?: boolean; contentKey?: string }[] = [
  { key: "privacy-intro", isIntro: true },
  { key: "privacy-section-1-title", contentKey: "privacy-section-1-content" },
  { key: "privacy-section-2-title", contentKey: "privacy-section-2-content" },
  { key: "privacy-section-3-title", contentKey: "privacy-section-3-content" },
  { key: "privacy-section-4-title", contentKey: "privacy-section-4-content" },
  { key: "privacy-section-5-title", contentKey: "privacy-section-5-content" },
  { key: "privacy-section-6-title", contentKey: "privacy-section-6-content" },
  { key: "privacy-section-7-title", contentKey: "privacy-section-7-content" },
  { key: "privacy-section-8-title", contentKey: "privacy-section-8-content" },
  { key: "privacy-section-9-title", contentKey: "privacy-section-9-content" },
  { key: "privacy-section-10-title", contentKey: "privacy-section-10-content" },
  { key: "privacy-section-11-title", contentKey: "privacy-section-11-content" },
  { key: "privacy-section-12-title", contentKey: "privacy-section-12-content" },
  { key: "privacy-section-13-title", contentKey: "privacy-section-13-content" },
  { key: "privacy-section-14-title", contentKey: "privacy-section-14-content" },
  { key: "privacy-section-15-title", contentKey: "privacy-section-15-content" },
  { key: "privacy-section-16-title", contentKey: "privacy-section-16-content" },
  { key: "privacy-section-17-title", contentKey: "privacy-section-17-content" },
  { key: "privacy-section-18-title", contentKey: "privacy-section-18-content" },
];

const PrivacyPage = () => {
  const { t } = useLanguage();

  return (
    <main className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {t("privacy-title")}
        </h1>
        <p className="text-white/60 text-center mb-12">{t("privacy-effective-date")}</p>

        <div className="space-y-8">
          {sections.map((section, index) => {
            if (section.isIntro) {
              return (
                <div key={index} className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10">
                  <div className="text-white/80 leading-relaxed whitespace-pre-line">
                    {t("privacy-intro")}
                  </div>
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

export default PrivacyPage;
