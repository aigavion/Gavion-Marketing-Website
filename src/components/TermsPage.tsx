import { useLanguage } from "@/contexts/LanguageContext";
import { FileText } from "lucide-react";

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
    <main className="pt-16 pb-16 px-4">
      {/* Hero Header */}
      <div className="relative overflow-hidden py-20 md:py-28 mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <FileText className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">Legal Agreement</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            {t("terms-title")}
          </h1>
          <p className="text-white/50 text-lg">{t("terms-effective-date")}</p>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          {sections.map((section, index) => {
            if (section.isIntro) {
              return (
                <div key={index} className="bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl p-6 md:p-8 border border-orange-500/10">
                  <p className="text-white/80 leading-relaxed whitespace-pre-line text-lg">
                    {t("terms-intro")}
                  </p>
                  <p className="text-white/80 leading-relaxed whitespace-pre-line mt-4 text-lg">
                    {t("terms-intro-2")}
                  </p>
                </div>
              );
            }

            return (
              <div key={index} className="group bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl p-6 md:p-8 border border-white/5 hover:border-orange-500/20 transition-all duration-300">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-orange-500 to-orange-400 flex-shrink-0" />
                  {t(section.key)}
                </h2>
                <div className="text-white/60 leading-relaxed whitespace-pre-line pl-4">
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
