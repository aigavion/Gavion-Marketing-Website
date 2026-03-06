import { useLanguage } from "@/contexts/LanguageContext";
import { MessageSquare, Phone, Target, Zap, Globe } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

interface TimelineItemData {
  id: number;
  title: string;
  titleFr: string;
  date: string;
  content: string;
  contentFr: string;
  category: string;
  icon: typeof MessageSquare;
  relatedIds: number[];
}

const servicesTimelineData: TimelineItemData[] = [
  {
    id: 1,
    title: "AI Website Chatbot",
    titleFr: "Chatbot IA pour Sites Web",
    date: "",
    content: "24/7 automated answering that captures leads and answers FAQs with human-like conversation. Bilingual EN/FR out of the box, custom trained on your documents.",
    contentFr: "Réponse automatique 24/7 qui capture des prospects et répond aux questions fréquentes avec une conversation humaine. Bilingue EN/FR, formé sur vos documents.",
    category: "Communication",
    icon: MessageSquare,
    relatedIds: [2, 3, 4],
  },
  {
    id: 2,
    title: "AI Desk Assistant",
    titleFr: "Assistant de Bureau IA",
    date: "",
    content: "Automated call handling, appointment scheduling, and smart reminders that keep your calendar full. Integrates with Google Calendar, email, and SMS.",
    contentFr: "Gestion automatisée des appels, prise de rendez-vous et rappels intelligents qui gardent votre calendrier plein. Intègre Google Calendar, email et SMS.",
    category: "Communication",
    icon: Phone,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Lead Qualification",
    titleFr: "Qualification de Prospects",
    date: "",
    content: "Automated prospecting and data enrichment so you only talk to qualified, high-intent leads. Web research, CRM integration, and real-time scoring.",
    contentFr: "Prospection automatisée et enrichissement de données pour ne parler qu'avec des prospects qualifiés. Recherche web, intégration CRM et scoring en temps réel.",
    category: "Sales",
    icon: Target,
    relatedIds: [1, 4],
  },
  {
    id: 4,
    title: "Workflow Automation",
    titleFr: "Automatisation des Flux",
    date: "",
    content: "Connect AI to your existing tools with Zapier, Make.com, n8n, and custom API connectors. Process optimization and monitoring included.",
    contentFr: "Connectez l'IA à vos outils existants avec Zapier, Make.com, n8n et connecteurs API personnalisés. Optimisation des processus et surveillance incluses.",
    category: "Integration",
    icon: Zap,
    relatedIds: [1, 3, 5],
  },
  {
    id: 5,
    title: "Web Design",
    titleFr: "Conception Web",
    date: "",
    content: "Modern, responsive website design that captures your brand and converts visitors into customers. Fast loading, SEO optimized, brand-aligned visuals.",
    contentFr: "Conception de sites web modernes et réactifs qui capturent votre marque et convertissent les visiteurs en clients. Chargement rapide, SEO optimisé, visuels alignés à votre marque.",
    category: "Design",
    icon: Globe,
    relatedIds: [4],
  },
];

export default function ServicesTimeline() {
  const { lang } = useLanguage();

  // Transform data to match TimelineItem interface with correct language
  const timelineData = servicesTimelineData.map(item => ({
    ...item,
    title: lang === 'fr' ? item.titleFr : item.title,
    content: lang === 'fr' ? item.contentFr : item.content,
    // Ensure icon is typed correctly for the timeline component
    icon: item.icon as React.ElementType,
  }));

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {lang === 'fr' ? "Nos Services" : "Our Services"}
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            {lang === 'fr' 
              ? "Solutions IA de bout en bout qui transforment votre façon d'engager les clients et de gérer votre entreprise. Explorez notre écosystème de services interactif."
              : "End-to-end AI solutions that transform how you engage with customers and run your business. Explore our interactive service ecosystem."
            }
          </p>
        </div>
        <div className="h-[1020px]">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </div>
    </section>
  );
}
