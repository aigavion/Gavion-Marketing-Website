import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChat } from '@/contexts/ChatContext';

interface Message {
  id: number;
  text: string;
  from: 'bot' | 'user';
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
- Pricing (Débutant: $249/mo, $199 setup, Croissance: $449/mo, $499 setup, Agence: $999/mo, contact for setup)
- How AI can solve their specific business problems
- Booking discovery calls

OFF-TOPIC RESPONSE EXAMPLES:
- "That's outside what I help with! But I'd be happy to tell you how our AI can streamline your business - what challenges are you facing?"
- "I don't have info on that, but I can definitely help you understand how AI automation could benefit your business. What area interests you most?"
- "C'est pas mon truc, mais je suis là pour parler des solutions IA pour les entreprises comme la vôtre. Quels problèmes essayez-vous de résoudre?"

HOW TO RESPOND:
- Ask questions to understand their needs
- If they seem interested, mention booking a discovery call
- Don't be overly enthusiastic or salesy
- Use conversational tone: "Hey! Yeah, we can definitely help with that..." instead of "Our services include..."
- No emojis, no bullet points, no fancy formatting
- Sound like a knowledgeable friend who happens to sell AI solutions

Pricing in short form (CAD):
- Débutant: $249/mo + $199 setup
- Croissance: $449/mo + $499 setup
- Agence: $999/mo + contact for pricing

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
- Tarifs (Débutant: 249$/mois, 199$ installation, Croissance: 449$/mois, 499$ installation, Agence: 999$/mois, contact pour installation)
- Comment l'IA peut résoudre leurs problèmes d'entreprise spécifiques
- Planifier des appels de découverte

RÉPONSES POUR SUJETS HORS SUJET:
- "C'est en dehors de ce que j'aide! Mais je serais content de vous expliquer comment notre IA peut optimiser votre entreprise - quels défis préférez-vous?"
- "Je n'ai pas d'info là-dessus, mais je peux definitely vous aider à comprendre comment l'automatisation IA pourrait bénéficier votre entreprise. Quel domaine vous interesse le plus?"
- "C'est pas mon rayon, mais je suis là pour discuter des solutions IA pour les entreprises comme la vôtre. Quels problèmes essayez-vous de résoudre?"

COMMENT RÉPONDRE:
- Posez des questions pour comprendre leurs besoins
- S'ils semblent intéressés, mentionnez de planifier un appel de découverte
- Ne soyez pas trop enthousiaste ou commercial
- Utilisez un ton conversationnel: "Salut! Oui, on peut definitely vous aider avec ça..." au lieu de "Nos services incluent..."
- Pas d'émojis, pas de listes à puces, pas de formatage élaboré
- Sonnez comme un ami knowledgeable qui vend des solutions IA

Tarifs en bref (CAD):
- Débutant: 249$/mois + 199$ installation
- Croissance: 449$/mois + 499$ installation
- Agence: 999$/mois + contactez-nous

Contact: hello@gavion.ai | +1 (514) 555-0123`
};

export default function ChatWidget() {
  const { lang } = useLanguage();
  const { messages, setMessages, messageIdRef } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isAtTop = window.scrollY <= 400;
      setShowButton(!isAtTop);
      if (isAtTop && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [messages]);

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

    const userMessage: Message = {
      id: ++messageIdRef.current,
      text: inputText,
      from: 'user'
    };
    setMessages(prev => [...prev, userMessage]);

    const messageToSend = inputText;
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 10);

    try {
      const aiResponse = await callOpenRouter(messageToSend, lang);
      const botMessage: Message = {
        id: ++messageIdRef.current,
        text: aiResponse,
        from: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 10);
    } catch (error) {
      const errorMessage: Message = {
        id: ++messageIdRef.current,
        text: lang === 'fr'
          ? "Désolé, j'ai des difficultés techniques. Veuillez réessayer ou nous contacter directement."
          : "Sorry, I'm having technical difficulties. Please try again or contact us directly.",
        from: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 10);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  const getWelcomeMessage = () => {
    if (lang === 'fr') {
      return "Bonjour! Je suis l'assistant IA de Gavion. Comment puis-je vous aider aujourd'hui?";
    }
    return "Hi there! I'm Gavion's AI assistant. How can I help you today?";
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const welcome: Message = {
          id: ++messageIdRef.current,
          text: getWelcomeMessage(),
          from: 'bot'
        };
        setMessages([welcome]);
      }, 500);
    }
  }, [isOpen, lang]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-glow transition-all z-50 ${isOpen || !showButton ? 'hidden' : 'flex'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-white/10">
          <div className="flex items-center justify-between px-4 py-3 bg-base border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-white font-medium text-sm">
                Gavion AI Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-2 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                {msg.from === 'bot' && (
                  <img src="/logo-chat.png" alt="Gavion" className="w-8 h-8 rounded-full flex-shrink-0 object-cover mt-1" style={{ animation: 'spin 7s linear infinite', animationDirection: 'reverse' }} />
                )}
                <div className={`rounded-2xl px-3 py-2 max-w-[80%] text-sm ${
                  msg.from === 'bot'
                    ? 'bg-white/5 text-white rounded-tl-none'
                    : 'bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
                {msg.from === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-surface-light flex-shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                <img src="/logo-chat.png" alt="Gavion" className="w-8 h-8 rounded-full flex-shrink-0 object-cover mt-1" style={{ animation: 'spin 7s linear infinite', animationDirection: 'reverse' }} />
                <div className="rounded-2xl p-3 bg-white/5 text-white rounded-tl-none">
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

          <div className="p-3 bg-surface border-t border-white/10">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={lang === 'fr' ? "Tapez un message..." : "Type a message..."}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
              />
              <button
                type="button"
                disabled={!inputText.trim() || isLoading}
                onClick={handleSend}
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
