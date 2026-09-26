import { forwardRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { ASSISTANT_INPUT_PLACEHOLDER } from "@/content/assistant";
import { useAssistantChat } from "@/hooks/use-assistant-chat";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  className?: string;
}

const ChatComposer = forwardRef<HTMLInputElement, ChatComposerProps>(({ className }, ref) => {
  const { isTyping, sendMessage } = useAssistantChat();
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim() || isTyping) return;
    sendMessage(draft);
    setDraft("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center gap-2", className)}>
      <Input
        ref={ref}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={ASSISTANT_INPUT_PLACEHOLDER}
        aria-label={ASSISTANT_INPUT_PLACEHOLDER}
        disabled={isTyping}
      />
      <button
        type="submit"
        disabled={isTyping || !draft.trim()}
        aria-label="Enviar pergunta"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </form>
  );
});
ChatComposer.displayName = "ChatComposer";

export default ChatComposer;
