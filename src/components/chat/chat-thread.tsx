import { useEffect, useRef } from "react";
import {
  ASSISTANT_SUGGESTIONS,
  ASSISTANT_TYPING_LABEL,
} from "@/content/assistant";
import { useAssistantChat } from "@/hooks/use-assistant-chat";
import { cn } from "@/lib/utils";

interface ChatThreadProps {
  className?: string;
}

const ChatThread = ({ className }: ChatThreadProps) => {
  const { messages, isTyping, sendMessage } = useAssistantChat();
  const endRef = useRef<HTMLDivElement>(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    // Na primeira pintura não rola: só a mensagem de boas-vindas está lá, e
    // um scrollIntoView aqui arrastaria a página inteira até a seção.
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, isTyping]);

  const showSuggestions = messages.length === 1;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div role="log" aria-live="polite" aria-label="Conversa com o assistente" className="flex flex-col gap-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
              message.from === "user"
                ? "self-end bg-primary text-primary-foreground"
                : "self-start bg-card border border-border text-foreground",
            )}
          >
            {message.text}
          </div>
        ))}

        {isTyping && (
          <p className="self-start rounded-2xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
            {ASSISTANT_TYPING_LABEL}
          </p>
        )}

        <div ref={endRef} />
      </div>

      {showSuggestions && (
        <div className="flex flex-wrap gap-2">
          {ASSISTANT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => sendMessage(suggestion)}
              className="rounded-full border border-border bg-brand-surface-2 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatThread;
