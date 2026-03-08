import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/contexts/ChatContext";

interface ChatMessage {
  id: number;
  text: string;
  from: "bot" | "user";
}

const SYSTEM_PROMPTS = {
  en: `You are chatting with visitors on Gavion's website. Gavion is a Quebec-based AI integration agency that helps small businesses automate operations, qualify leads, and improve customer engagement.

IMPORTANT RULES:
1. ONLY answer questions related to Gavion's services, pricing, AI solutions, or how you can help their business
2. If asked about anything else (weather, sports, news, personal questions, random topics), politely redirect to what you can help with
3. Talk like a REAL PERSON, not a robot. Use casual language, contractions, natural phrases
4. Keep responses SHORT - 1-3 sentences max, especially for quick answers
5. Be friendly and warm, like a helpful sales rep would be

WHAT YOU CAN HELP WITH:
- AI chatbots for websites (24/7 customer support, lead capture)
- AI receptionist/desk assistant (call handling, appointment scheduling)
- Lead qualification and automation
- Workflow automation (Zapier, Make.com, n8n integrations)
- Pricing (Starter: $0 setup, Growth: $500 setup, Agency: custom)
- How AI can solve their specific business problems
- Booking discovery calls

OFF-TOPIC RESPONSE EXAMPLES:
- "That's outside what I help with! But I'd be happy to tell you how our AI can streamline your business - what challenges are you facing?"
- "I don't have info on that, but I can definitely help you understand how AI automation could benefit your business. What area interests you most?"
- "That's not my thing, but I'm here to chat about AI solutions for businesses like yours. What problems are you trying to solve?"

HOW TO RESPOND:
- Ask questions to understand their needs
- If they seem interested, mention booking a discovery call
- Don't be overly enthusiastic or salesy
- Use conversational tone: "Hey! Yeah, we can definitely help with that..." instead of "Our services include..."
- No emojis, no bullet points, no fancy formatting
- Sound like a knowledgeable friend who happens to sell AI solutions

Pricing in short form:
- Starter: $0 setup (basic chatbot, 1 calendar, email support)
- Growth: $500 setup (full AI chat, custom knowledge base, SMS reminders, priority support)
- Agency: Contact for pricing (white-label, multi-client, dedicated manager)

Contact: hello@gavion.ai | +1 (514) 555-0123`,

  fr: `Vous discutez avec les visiteurs du site web de Gavion. Gavion est une agence d'intégration IA basée au Québec qui aide les petites entreprises à automatiser leurs opérations, qualifier leurs prospects et améliorer l'engagement client.

RÈGLES IMPORTANTES:
1. Répondez SEULEMENT aux questions liées aux services de Gavion, aux prix, aux solutions IA ou à comment vous pouvez aider leur entreprise
2. Si on vous pose des questions sur autre chose (météo, sports, nouvelles, questions personnelles), redirigez poliment vers ce que vous pouvez aider
3. Parlez comme une VRAIE PERSONNE, pas comme un robot. Utilisez un langage décontracté, des contractions, des phrases naturelles
4. Gardez les réponses COURTES - maximum 1-3 phrases, surtout pour les réponses rapides
5. Soyez amical et chaleureux, comme un représentant des ventes utile

CE QUE VOUS POUVEZ AIDER:
- Chatbots IA pour sites web (support client 24/7, capture de prospects)
- Assistant/réceptionniste IA (gestion des appels, prise de rendez-vous)
- Qualification de prospects et automatisation
- Automatisation des flux de travail (intégrations Zapier, Make.com, n8n)
- Tarifs (Starter: 0$ d'installation, Croissance: 500$, Agence: sur mesure)
- Comment l'IA peut résoudre leurs problèmes d'entreprise spécifiques
- Planifier des appels de découverte

RÉPONSES POUR SUJETS HORS SUJET:
- "C'est en dehors de ce que j'aide! Mais je serais content de vous expliquer comment notre IA peut optimiser votre entreprise - quels défisissez-vous?"
- "Je n'ai pas d'info là-dessus, mais je peux definitely vous aider à comprendre comment l'automatisation IA pourrait bénéficier votre entreprise. Quel domaine vous interesse le plus?"
- "C'est pas mon rayon, mais je suis là pour discuter des solutions IA pour les entreprises comme la vôtre. Quels problèmes essayez-vous de résoudre?"

COMMENT RÉPONDRE:
- Posez des questions pour comprendre leurs besoins
- S'ils semblent intéressés, mentionnez de planifier un appel de découverte
- Ne soyez pas trop enthousiaste ou commercial
- Utilisez un ton conversationnel: "Salut! Oui, on peut definitely vous aider avec ça..." au lieu de "Nos services incluent..."
- Pas d'émojis, pas de listes à puces, pas de formatage élaboré
- Sonnez comme un ami knowledgeable qui vend des solutions IA

Tarifs en bref:
- Starter: 0$ d'installation (chatbot basique, 1 calendrier, support email)
- Growth: 500$ d'installation (chat IA complet, base de connaissances personnalisée, rappels SMS, support prioritaire)
- Agence: Sur devis (marque blanche, multi-clients, gestionnaire dédié)

Contact: hello@gavion.ai | +1 (514) 555-0123`
};

export default function Hero() {
  const { t, lang } = useLanguage();
  const { messages, setMessages, messageIdRef } = useChat();
  const [inputText, setInputText] = useState("");
  const [isConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeText = lang === "fr"
        ? "Bonjour! Je suis l'assistant IA de Gavion. Comment puis-je vous aider aujourd'hui?"
        : "Hi there! I'm Gavion's AI assistant. How can I help you today?";
      
      const welcome: ChatMessage = {
        id: ++messageIdRef.current,
        text: welcomeText,
        from: "bot",
      };
      setMessages([welcome]);
    }
  }, [lang]);

  const callOpenRouter = async (userMessage: string, language: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!apiKey) {
      throw new Error("API key not configured");
    }

    const systemPrompt = language === "fr" ? SYSTEM_PROMPTS.fr : SYSTEM_PROMPTS.en;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Gavion Website"
      },
      body: JSON.stringify({
        model: "stepfun/step-3.5-flash:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 512,
        temperature: 0.6
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response";
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const scrollY = window.scrollY;

    const userMessage: ChatMessage = {
      id: ++messageIdRef.current,
      text: inputText,
      from: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    const messageToSend = inputText;
    setInputText("");
    setIsLoading(true);

    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 10);

    try {
      const aiResponse = await callOpenRouter(messageToSend, lang);
      const botMessage: ChatMessage = {
        id: ++messageIdRef.current,
        text: aiResponse,
        from: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 10);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: ++messageIdRef.current,
        text: lang === "fr" 
          ? "Désolé, je rencontre actuellement des difficultés. Veuillez réessayer plus tard."
          : "Sorry, I'm having trouble right now. Please try again later.",
        from: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Chat error:", error);
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 10);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
      return false;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-transparent"></div>
      
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-500 text-xs font-semibold uppercase tracking-wide mb-6">
              {t('hero-badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6" dangerouslySetInnerHTML={{ __html: t('hero-title') }}>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero-subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <a
                href="#process"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 text-white rounded-full font-semibold hover:bg-brand-600 transition-all"
              >
                {t('hero-cta-secondary')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Animated Chat Demo */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-dark rounded-2xl p-1 shadow-soft transform lg:translate-x-8">
              <div className="bg-dark-800/80 backdrop-blur rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-dark-900/50 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 pulse-dot" : "bg-red-500"}`}></div>
                    <span className="text-white font-medium text-sm">{t('chat-header')}</span>
                  </div>
                  <span className="text-xs text-white/60">{isConnected ? t('chat-status') : (lang === 'fr' ? "● Hors ligne" : "● Offline")}</span>
                </div>
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-dark-900/30" id="chat-demo">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.from === "user" ? "justify-end" : ""}`}>
                      {msg.from === "bot" && (
                      <img src="https://i.ibb.co/1YVxD2PT/LOGO-removebg-preview.png" alt="Gavion" className="w-8 h-8 rounded-full flex-shrink-0 object-cover mt-2" style={{ animation: 'spin 7s linear infinite', animationDirection: 'reverse' }} />
                      )}
                      <div className={`rounded-2xl p-3 max-w-[85%] text-sm leading-relaxed ${msg.from === "bot" ? "bg-white/10 text-white rounded-tl-none" : "bg-brand-600 text-white rounded-tr-none"}`}>
                        {msg.text}
                      </div>
                      {msg.from === "user" && (
                        <div className="w-8 h-8 rounded-full bg-dark-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">U</div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3">
<img src="https://i.ibb.co/1YVxD2PT/LOGO-removebg-preview.png" alt="Gavion" className="w-8 h-8 rounded-full flex-shrink-0 object-cover mt-2" style={{ animation: 'spin 7s linear infinite', animationDirection: 'reverse' }} />
                      <div className="rounded-2xl p-3 bg-white/10 text-white rounded-tl-none">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-dark-800/50 border-t border-white/5">
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                      placeholder={t('chat-placeholder')}
                    />
                    <button 
                      type="button"
                      disabled={!inputText.trim() || isLoading}
                      onClick={handleSend}
                      className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-glow"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
