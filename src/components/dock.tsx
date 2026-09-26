import { useEffect, useRef, useState } from "react";
import { MessageCircle, Sparkles, X } from "lucide-react";
import ChatComposer from "@/components/chat/chat-composer";
import ChatThread from "@/components/chat/chat-thread";
import {
  DOCK_CLOSE_LABEL,
  DOCK_OPEN_LABEL,
  DOCK_PANEL_TITLE,
  DOCK_WHATSAPP_LABEL,
} from "@/content/assistant";
import { waLink } from "@/content/site";

const Dock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    // z-40: abaixo do header e dos diálogos, que ficam em z-50.
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          role="dialog"
          aria-label={DOCK_PANEL_TITLE}
          className="w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-border bg-card shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{DOCK_PANEL_TITLE}</p>
          </div>
          <div className="max-h-[50vh] overflow-y-auto px-4 py-4">
            <ChatThread />
          </div>
          <div className="border-t border-border px-4 py-3">
            <ChatComposer ref={inputRef} />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={DOCK_WHATSAPP_LABEL}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <MessageCircle className="h-5 w-5" />
        </a>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? DOCK_CLOSE_LABEL : DOCK_OPEN_LABEL}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

export default Dock;
