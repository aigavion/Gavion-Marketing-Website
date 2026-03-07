import { useLanguage } from "@/contexts/LanguageContext";
import { MessageSquare, Phone, Target, Zap, Globe, ArrowRight, CheckCircle, Users, Calendar, Mail, FileText, BarChart3, Cog, Rocket, Palette, Clock, TrendingUp } from "lucide-react";

interface WorkflowStep {
  label: string;
  labelFr: string;
  description: string;
  descriptionFr: string;
  icon: React.ElementType;
}

interface ServiceWorkflow {
  id: number;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  steps: WorkflowStep[];
  color: string;
}

const servicesWorkflows: ServiceWorkflow[] = [
  {
    id: 1,
    title: "AI Website Chatbot",
    titleFr: "Chatbot IA pour Site Web",
    description: "A 24/7 intelligent chatbot that engages visitors, qualifies leads, and answers FAQs in natural conversation. Bilingual EN/FR, trained on your documents.",
    descriptionFr: "Un chatbot intelligent 24/7 qui engage les visiteurs, qualifie les prospects et répond aux FAQ en conversation naturelle. Bilingue EN/FR, formé sur vos documents.",
    color: "from-orange-500 to-red-500",
    steps: [
      { label: "Visitor Arrives", labelFr: "Visiteur Arrive", description: "A visitor lands on your website and the AI detects their presence.", descriptionFr: "Un visiteur arrive sur votre site et l'IA détecte sa présence.", icon: Users },
      { label: "AI Greets", labelFr: "IA Accueille", description: "The chatbot initiates a friendly, personalized greeting in their language.", descriptionFr: "Le chatbot initie un accueil amical et personnalisé dans leur langue.", icon: MessageSquare },
      { label: "Qualifies Need", labelFr: "Qualifie le Besoin", description: "The AI asks questions to understand the visitor's needs and intent.", descriptionFr: "L'IA pose des questions pour comprendre les besoins et intentions du visiteur.", icon: Target },
      { label: "Captures Lead", labelFr: "Capture le Prospect", description: "Contact info is collected (email, phone) for follow-up.", descriptionFr: "Les informations de contact sont collectées (email, téléphone) pour le suivi.", icon: FileText },
      { label: "Stores in CRM", labelFr: "Enregistre dans CRM", description: "Lead data is saved to your CRM with full conversation context.", descriptionFr: "Les données du prospect sont enregistrées dans votre CRM avec le contexte complet.", icon: BarChart3 },
    ]
  },
  {
    id: 2,
    title: "AI Desk Assistant",
    titleFr: "Assistant de Bureau IA",
    description: "Automated call handling and appointment scheduling that keeps your calendar full. Integrates with Google Calendar, email, and SMS for seamless operations.",
    descriptionFr: "Gestion automatisée des appels et prise de rendez-vous qui garde votre calendrier plein. Intègre Google Calendar, email et SMS pour des opérations fluides.",
    color: "from-blue-500 to-cyan-500",
    steps: [
      { label: "Call/Email Received", labelFr: "Appel/Email Reçu", description: "A new call or email comes in and is routed to the AI.", descriptionFr: "Un nouvel appel ou email arrive et est routé vers l'IA.", icon: Phone },
      { label: "AI Handles Request", labelFr: "IA Gère la Demande", description: "The AI understands the request using natural language processing.", descriptionFr: "L'IA comprend la demande en utilisant le traitement du langage naturel.", icon: Cog },
      { label: "Checks Availability", labelFr: "Vérifie Disponibilité", description: "Real-time check of your calendar for available time slots.", descriptionFr: "Vérification en temps réel de votre calendrier pour les créneaux disponibles.", icon: Calendar },
      { label: "Schedules & Confirms", labelFr: "Planifie & Confirme", description: "The AI proposes times, books the appointment, and sends confirmation.", descriptionFr: "L'IA propose des horaires, réserve le rendez-vous et envoie la confirmation.", icon: CheckCircle },
      { label: "Updates Calendar", labelFr: "Met à Jour Calendrier", description: "All appointments are synced to your calendar automatically.", descriptionFr: "Tous les rendez-vous sont synchronisés avec votre calendrier automatiquement.", icon: Calendar },
    ]
  },
  {
    id: 3,
    title: "Lead Qualification",
    titleFr: "Qualification de Prospects",
    description: "Automated prospecting and data enrichment that ensures you only talk to qualified, high-intent leads. Web research, CRM integration, and real-time scoring.",
    descriptionFr: "Prospection automatisée et enrichissement de données pour ne parler qu'aux prospects qualifiés. Recherche web, intégration CRM et scoring en temps réel.",
    color: "from-green-500 to-emerald-500",
    steps: [
      { label: "Lead Enters", labelFr: "Prospect Entre", description: "A new lead enters your system via form, chat, or import.", descriptionFr: "Un nouveau prospect entre dans votre système via formulaire, chat ou import.", icon: Users },
      { label: "AI Researches", labelFr: "IA Recherche", description: "The AI gathers data about the lead from web sources and social media.", descriptionFr: "L'IA recueille des données sur le prospect à partir de sources web et réseaux sociaux.", icon: Globe },
      { label: "Scores Intent", labelFr: "Score d'Intérêt", description: "The lead is scored based on fit, intent, and engagement level.", descriptionFr: "Le prospect est noté en fonction de l'adéquation, de l'intention et du niveau d'engagement.", icon: TrendingUp },
      { label: "Routes to Sales", labelFr: "Transfère à Ventes", description: "High-scoring leads are automatically routed to your sales team.", descriptionFr: "Les prospects à score élevé sont automatiquement routés vers votre équipe commerciale.", icon: ArrowRight },
      { label: "Follow-up Ready", labelFr: "Suivi Prêt", description: "Your team gets a detailed report with talking points and next steps.", descriptionFr: "Votre équipe reçoit un rapport détaillé avec points de discussion et prochaines étapes.", icon: Clock },
    ]
  },
  {
    id: 4,
    title: "Workflow Automation",
    titleFr: "Automatisation des Flux",
    description: "Connect AI to your existing tools with Zapier, Make.com, n8n, and custom API connectors. Process optimization and continuous monitoring included.",
    descriptionFr: "Connectez l'IA à vos outils existants avec Zapier, Make.com, n8n et connecteurs API personnalisés. Optimisation des processus et surveillance continues incluses.",
    color: "from-purple-500 to-pink-500",
    steps: [
      { label: "Trigger Event", labelFr: "Événement Déclencheur", description: "A specific event starts the workflow (new lead, form submit, etc.).", descriptionFr: "Un événement spécifique déclenche le flux (nouveau prospect, soumission de formulaire, etc.).", icon: Zap },
      { label: "AI Processes", labelFr: "IA Traite", description: "The AI analyzes the data and determines the appropriate action.", descriptionFr: "L'IA analyse les données et détermine l'action appropriée.", icon: Cog },
      { label: "Connects Tools", labelFr: "Connecte Outils", description: "Data is sent to your connected tools (CRM, email, databases).", descriptionFr: "Les données sont envoyées vers vos outils connectés (CRM, email, bases de données).", icon: Cog },
      { label: "Notifies Team", labelFr: "Notifie l'Équipe", description: "Team members receive alerts via email, Slack, or SMS.", descriptionFr: "Les membres de l'équipe reçoivent des alertes par email, Slack ou SMS.", icon: Mail },
      { label: "Logs Result", labelFr: "Enregistre Résultat", description: "All actions and results are logged for audit and optimization.", descriptionFr: "Toutes les actions et résultats sont enregistrés pour l'audit et l'optimisation.", icon: FileText },
    ]
  },
  {
    id: 5,
    title: "Web Design",
    titleFr: "Conception Web",
    description: "Modern, responsive website design that captures your brand and converts visitors into customers. Fast loading, SEO optimized, with brand-aligned visuals.",
    descriptionFr: "Conception de sites web modernes et réactifs qui capturent votre marque et convertissent les visiteurs en clients. Chargement rapide, SEO optimisé, visuels alignés.",
    color: "from-yellow-500 to-orange-500",
    steps: [
      { label: "Discovery", labelFr: "Découverte", description: "We learn about your business, goals, audience, and competitors.", descriptionFr: "Nous découvrons votre entreprise, vos objectifs, votre public et vos concurrents.", icon: Users },
      { label: "Design Mockup", labelFr: "Maquette Design", description: "We create wireframes and visual designs for your approval.", descriptionFr: "Nous créons des maquettes et designs visuels pour votre approbation.", icon: Palette },
      { label: "Review & Revise", labelFr: "Révision", description: "You review the designs and request changes if needed.", descriptionFr: "Vous examinez les designs et demandez des modifications si nécessaire.", icon: FileText },
      { label: "Development", labelFr: "Développement", description: "We build the website with responsive, SEO-friendly code.", descriptionFr: "Nous développons le site avec du code réactif et optimisé pour le SEO.", icon: Cog },
      { label: "Launch", labelFr: "Lancement", description: "The website goes live with full testing and optimization.", descriptionFr: "Le site est mis en ligne avec des tests complets et l'optimisation.", icon: Rocket },
    ]
  },
];

function WorkflowDiagram({ workflow, lang }: { workflow: ServiceWorkflow; lang: string }) {
  const arrowColorClass = () => {
    const colors = [
      'text-orange-400',
      'text-blue-400',
      'text-green-400',
      'text-purple-400',
      'text-yellow-400'
    ];
    return colors[workflow.id - 1] || 'text-white/60';
  };

  const getScrollbarClass = () => {
    if (workflow.color.includes('orange')) return 'scrollbar-orange';
    if (workflow.color.includes('blue')) return 'scrollbar-blue';
    if (workflow.color.includes('green')) return 'scrollbar-green';
    if (workflow.color.includes('purple')) return 'scrollbar-purple';
    return 'scrollbar-yellow';
  };

  return (
    <div className="py-8">
      <div className={`flex flex-nowrap items-stretch justify-start gap-2 md:gap-3 overflow-x-auto pb-6 px-2 ${getScrollbarClass()}`}>
        {workflow.steps.map((step, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <div className="mb-1 text-base font-bold text-white/60 uppercase tracking-wider">
                {lang === 'fr' ? `Étape ${index + 1}` : `Step ${index + 1}`}
              </div>
              <div className={`w-44 h-44 md:w-48 md:h-44 rounded-2xl bg-gradient-to-br ${workflow.color} p-[3px] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,107,53,0.3)]`}>
                <div className="w-full h-full bg-dark-900 rounded-xl flex flex-col items-center justify-start pt-1 gap-1 border border-white/10 shadow-inner">
                  <div className={`p-1.5 rounded-full bg-gradient-to-br ${workflow.color} shadow-lg`}>
                    <step.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-xl text-white font-bold text-center px-2 leading-tight">
                    {lang === 'fr' ? step.labelFr : step.label}
                  </span>
                  <span className="text-sm text-white/70 text-center px-2 leading-tight mt-1">
                    {lang === 'fr' ? step.descriptionFr : step.description}
                  </span>
                </div>
              </div>
            </div>
            {index < workflow.steps.length - 1 && (
              <div className={`flex-shrink-0 flex items-center justify-center h-44 w-8 -ml-1 ${arrowColorClass()}`}>
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 opacity-70 animate-pulse translate-y-[10px] translate-x-[5px]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 pb-16">
      <section className="container mx-auto px-6 max-w-7xl mb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {lang === 'fr' ? "Nos Services" : "Our Services"}
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            {lang === 'fr'
              ? "Découvrez comment nos solutions IA transforment votre entreprise. Chaque service est conçu pour automatiser, optimiser et développer vos opérations."
              : "Discover how our AI solutions transform your business. Each service is designed to automate, optimize, and grow your operations."
            }
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-7xl space-y-20">
        {servicesWorkflows.map((workflow) => (
          <div
            key={workflow.id}
            className="bg-dark-800/50 rounded-3xl p-6 md:p-10 border border-white/5"
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
              <div className="lg:w-1/3">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${workflow.color} mb-4`}>
                  <span className="text-white text-sm font-medium">
                    0{workflow.id}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {lang === 'fr' ? workflow.titleFr : workflow.title}
                </h2>
                <p className="text-white/70 leading-relaxed">
                  {lang === 'fr' ? workflow.descriptionFr : workflow.description}
                </p>
              </div>
              
              <div className="lg:w-2/3">
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
                  {lang === 'fr' ? "Flux de Travail" : "Workflow"}
                </h3>
                <WorkflowDiagram workflow={workflow} lang={lang} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="container mx-auto px-6 max-w-4xl mt-20">
        <div className="bg-gradient-to-br from-brand-500/20 to-orange-500/20 rounded-3xl p-8 md:p-12 border border-brand-500/30 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang === 'fr' ? "Prêt à Transformer Votre Entreprise?" : "Ready to Transform Your Business?"}
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {lang === 'fr'
              ? "Commencez votre parcours IA dès aujourd'hui. Notre équipe vous guide à chaque étape."
              : "Start your AI journey today. Our team guides you every step of the way."
            }
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold transition-all shadow-glow"
          >
            {lang === 'fr' ? "Commencer" : "Get Started"}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  );
}
