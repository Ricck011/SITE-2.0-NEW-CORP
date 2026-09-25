import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import DeviceFrame from "@/components/ui/device-frame";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import {
  GAME_BROTHERS_DESKTOP_COMPARE,
  GAME_BROTHERS_LEDE,
  GAME_BROTHERS_MOVES,
  GAME_BROTHERS_PHONE_AFTER,
  GAME_BROTHERS_STATUS,
  GAME_BROTHERS_TAG,
  GAME_BROTHERS_TITLE,
} from "@/content/case-game-brothers";
import { Info } from "lucide-react";
import ComparePair from "./compare-pair";

const MobileApp = () => {
  return (
    <section className="md:pt-20 xl:pt-32 pt-12 bg-background" id="case-game-brothers">
      <Container className="space-y-10">
        <div className="max-w-[683px]">
          <AnimateOnView once blur className="md:mb-4 mb-1.5">
            <Badge variant="secondary">{GAME_BROTHERS_TAG}</Badge>
          </AnimateOnView>

          <AnimateOnView once blur delay={0.2} className="md:mb-6 mb-3">
            <h2 className="h2 text-foreground">{GAME_BROTHERS_TITLE}</h2>
          </AnimateOnView>

          <AnimateOnView once blur delay={0.4}>
            <p className="text-lg text-muted-foreground">{GAME_BROTHERS_LEDE}</p>
          </AnimateOnView>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <StaggerContainer className="flex flex-col gap-6 mb-8">
              {GAME_BROTHERS_MOVES.map((move, index) => (
                <AnimateOnView
                  key={move.number}
                  once
                  blur
                  delay={0.1 + index * 0.05}
                  className="flex gap-4"
                >
                  <span className="shrink-0 font-mono text-sm text-brand-accent-soft pt-1">{move.number}</span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{move.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{move.description}</p>
                  </div>
                </AnimateOnView>
              ))}
            </StaggerContainer>

            <AnimateOnView once delay={0.3} className="flex gap-3 p-4 rounded-xl bg-brand-surface-2 border border-border">
              <Info className="w-5 h-5 shrink-0 text-muted-foreground mt-0.5" aria-hidden />
              <p className="text-sm text-muted-foreground leading-relaxed">{GAME_BROTHERS_STATUS}</p>
            </AnimateOnView>
          </div>

          <AnimateOnView once blur delay={0.5} className="flex flex-col items-center lg:items-end gap-8">
            <DeviceFrame src={GAME_BROTHERS_PHONE_AFTER.src} alt={GAME_BROTHERS_PHONE_AFTER.alt} />
            <ComparePair label="primeira tela, computador" images={GAME_BROTHERS_DESKTOP_COMPARE} />
          </AnimateOnView>
        </div>
      </Container>
    </section>
  );
};

export default MobileApp;
