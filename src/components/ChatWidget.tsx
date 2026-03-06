import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: number;
  text: string;
  from: 'bot' | 'user';
}

export default function ChatWidget() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const messageIdRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join', { language: lang });
    });

    socket.on('message', (data: { text: string }) => {
      if (data.text) {
        const newMessage: Message = {
          id: ++messageIdRef.current,
          text: data.text,
          from: 'bot'
        };
        setMessages(prev => [...prev, newMessage]);
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [isOpen, lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !socketRef.current || isLoading) return;

    const userMessage: Message = {
      id: ++messageIdRef.current,
      text: inputText,
      from: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    
    socketRef.current.emit('message', { 
      text: inputText, 
      language: lang 
    });
    
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getWelcomeMessage = () => {
    if (lang === 'fr') {
      return "Bonjour! Je suis l'assistant Gavion. Comment puis-je vous aider aujourd'hui?";
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
        className={`fixed bottom-6 right-6 w-14 h-14 bg-brand-500 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-600 transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-dark-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-white/10">
          <div className="flex items-center justify-between px-4 py-3 bg-dark-900 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-white font-medium text-sm">
                {lang === 'fr' ? "Assistant Gavion" : "Gavion Assistant"}
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-900/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-2 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                {msg.from === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-brand-500 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`rounded-2xl px-3 py-2 max-w-[80%] text-sm ${
                  msg.from === 'bot' 
                    ? 'bg-white/10 text-white rounded-tl-none' 
                    : 'bg-brand-600 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
                {msg.from === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-dark-600 flex-shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-500 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/10 text-white rounded-2xl rounded-tl-none px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-dark-800 border-t border-white/10">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={lang === 'fr' ? "Tapez un message..." : "Type a message..."}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
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
