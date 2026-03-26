import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageSquare, Phone, Target, Zap, Globe } from "lucide-react";

const services = [
  { id: 1, title: "AI Website Chatbot", titleFr: "Chatbot IA pour Sites Web", desc: "24/7 automated answering that captures leads and answers FAQs.", descFr: "Réponse automatique 24/7 qui capture des prospects et répond aux FAQ.", icon: MessageSquare },
  { id: 2, title: "AI Desk Assistant", titleFr: "Assistant de Bureau IA", desc: "Automated call handling and appointment scheduling.", descFr: "Gestion automatisée des appels et prise de rendez-vous.", icon: Phone },
  { id: 3, title: "Lead Qualification", titleFr: "Qualification de Prospects", desc: "Automated prospecting and data enrichment for high-intent leads.", descFr: "Prospection automatisée et enrichissement de données.", icon: Target },
  { id: 4, title: "Workflow Automation", titleFr: "Automatisation des Flux", desc: "Connect AI to your tools with Zapier, Make.com, and n8n.", descFr: "Connectez l'IA à vos outils avec Zapier, Make.com et n8n.", icon: Zap },
  { id: 5, title: "Web Design", titleFr: "Conception Web", desc: "Modern, responsive websites that convert visitors into customers.", descFr: "Sites web modernes et réactifs qui convertissent les visiteurs.", icon: Globe },
];

export default function ServicesTimeline() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const handleServiceClick = (id: number) => {
    navigate('/services', { state: { scrollToService: id } });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {lang === 'fr' ? "Nos Services" : "Our Services"}
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            {lang === 'fr'
              ? "Solutions IA de bout en bout qui transforment votre façon d'engager les clients et de gérer votre entreprise."
              : "End-to-end AI solutions that transform how you engage with customers and run your business."
            }
          </p>
        </div>

        {/* Connecting line */}
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent -translate-y-1/2 z-0" />

          {/* Desktop: grid, Mobile: horizontal scroll */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-6 relative z-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-surface/60 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-orange-500/50 hover:scale-105 hover:shadow-glow transition-all duration-300 cursor-pointer reveal"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {lang === 'fr' ? service.titleFr : service.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {lang === 'fr' ? service.descFr : service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 relative z-10 -mx-6 px-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="snap-center flex-shrink-0 w-[240px] group bg-surface/60 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {lang === 'fr' ? service.titleFr : service.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {lang === 'fr' ? service.descFr : service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
