import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { ASSISTANT_WELCOME_MESSAGE } from "@/content/assistant";
import { ASSISTANT_TYPING_DELAY_MS, getAssistantReply } from "@/lib/assistant";

export interface ChatMessage {
  id: string;
  from: "bot" | "user";
  text: string;
}

interface AssistantChatContextValue {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (text: string) => void;
}

const AssistantChatContext = createContext<AssistantChatContextValue | null>(null);

let messageIdCounter = 0;
function nextMessageId(): string {
  messageIdCounter += 1;
  return `msg-${messageIdCounter}`;
}

/**
 * Guarda a conversa do assistente num lugar só, consumido tanto pela seção
 * #assistente quanto pelo painel do dock — as duas superfícies mostram
 * sempre a mesma conversa. Precisa morar acima de <Routes> em App.tsx (não
 * em Layout.tsx): cada página monta seu próprio <Layout>, então um Provider
 * ali perderia a conversa a cada troca de rota.
 */
export function AssistantChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: nextMessageId(), from: "bot", text: ASSISTANT_WELCOME_MESSAGE },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const replyTimerRef = useRef<number | null>(null);

  const sendMessage = useCallback((text: string) => {
    const question = text.trim();
    if (!question) return;

    setMessages((prev) => [...prev, { id: nextMessageId(), from: "user", text: question }]);
    setIsTyping(true);

    if (replyTimerRef.current !== null) window.clearTimeout(replyTimerRef.current);
    replyTimerRef.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextMessageId(), from: "bot", text: getAssistantReply(question) }]);
      setIsTyping(false);
    }, ASSISTANT_TYPING_DELAY_MS);
  }, []);

  const value = useMemo(() => ({ messages, isTyping, sendMessage }), [messages, isTyping, sendMessage]);

  return <AssistantChatContext.Provider value={value}>{children}</AssistantChatContext.Provider>;
}

export function useAssistantChat(): AssistantChatContextValue {
  const ctx = useContext(AssistantChatContext);
  if (!ctx) throw new Error("useAssistantChat precisa estar dentro de <AssistantChatProvider>");
  return ctx;
}
