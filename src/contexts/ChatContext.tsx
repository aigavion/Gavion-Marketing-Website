import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatMessage {
  id: number;
  text: string;
  from: 'bot' | 'user';
}

interface ChatContextType {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  messageIdRef: { current: number };
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messageIdRef = { current: 0 };

  return (
    <ChatContext.Provider value={{ messages, setMessages, messageIdRef }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
