import Container from "@/components/container";
import ChatComposer from "@/components/chat/chat-composer";
import ChatThread from "@/components/chat/chat-thread";
import { Badge } from "@/components/ui/badge";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { ASSISTANT_BADGE, ASSISTANT_LEDE, ASSISTANT_TITLE } from "@/content/assistant";

const Assistant = () => {
  return (
    <section className="md:pt-20 xl:pt-32 pt-12 bg-background" id="assistente">
      <Container className="space-y-10">
        <div className="max-w-[683px]">
          <AnimateOnView once blur className="md:mb-4 mb-1.5">
            <Badge variant="secondary">{ASSISTANT_BADGE}</Badge>
          </AnimateOnView>

          <AnimateOnView once blur delay={0.2} className="md:mb-6 mb-3">
            <h2 className="h2 text-foreground">{ASSISTANT_TITLE}</h2>
          </AnimateOnView>

          <AnimateOnView once blur delay={0.4}>
            <p className="text-lg text-muted-foreground">{ASSISTANT_LEDE}</p>
          </AnimateOnView>
        </div>

        <AnimateOnView once delay={0.3} className="max-w-[760px]">
          <div className="rounded-2xl border border-border bg-brand-surface-2 p-4 sm:p-6 space-y-4">
            <ChatThread className="min-h-[220px]" />
            <ChatComposer />
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default Assistant;
