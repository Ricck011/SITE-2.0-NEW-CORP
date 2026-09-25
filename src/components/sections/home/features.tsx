import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { CORE_FRONTS } from "@/content/deliverables";
import { cn } from "@/lib/utils";
import { motion, MotionValue } from "framer-motion";
import { LayoutDashboard, LayoutTemplate, MessageCircle, Palette } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

const FRONT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "identidade-visual": Palette,
  "landing-pages": LayoutTemplate,
  "sistemas-gestao": LayoutDashboard,
  atendimento: MessageCircle,
};

interface FeaturesProps {
  cardSlotRef: React.RefObject<HTMLDivElement>;
  cardX: MotionValue<number>;
  cardY: MotionValue<number>;
  cardScale: MotionValue<number>;
  cardOpacity: MotionValue<number>;
  active: boolean;
}

const Features = ({ cardSlotRef, cardX, cardY, cardScale, cardOpacity, active }: FeaturesProps) => {
  return (
    <section className="md:pt-20 xl:pt-[100px] pt-12 md:pb-20 pb-12" id="features">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        <AnimateOnView>
          <h2 className="h4 text-center max-w-[520px] mx-auto mb-4">
            Três frentes, <span className="text-muted-foreground">um só time</span>
          </h2>
        </AnimateOnView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 relative lg:items-center">
          {CORE_FRONTS.map((front, index) => {
            const Icon = FRONT_ICONS[front.id] ?? Palette;

            return (
              <AnimateOnView
                key={front.id}
                once
                y={40}
                delay={index * 0.1}
                className={cn("relative z-0", front.hasEmblemSlot && "lg:z-10")}
              >
                <Card
                  className={cn(
                    "h-full flex flex-col gap-4 rounded-lg transition-transform",
                    front.hasEmblemSlot &&
                      "lg:-translate-y-4 lg:scale-[1.06] border-primary/40 shadow-[0_0_50px_-12px_rgba(225,29,46,0.4)]",
                  )}
                >
                  <CardContent className="flex flex-col items-center text-center gap-3 pt-2">
                    {front.hasEmblemSlot ? (
                      <div ref={cardSlotRef} className="relative w-14 h-14 mb-1">
                        {active ? (
                          <motion.img
                            src="/images/marca/newcorp-emblema.webp"
                            alt="Emblema NEW CORP"
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{ x: cardX, y: cardY, scale: cardScale, opacity: cardOpacity }}
                          />
                        ) : (
                          <img
                            src="/images/marca/newcorp-emblema.webp"
                            alt="Emblema NEW CORP"
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="w-14 h-14 mb-1 flex items-center justify-center rounded-full bg-brand-surface-2">
                        <Icon className="w-6 h-6 text-brand-red-soft" />
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-card-foreground">{front.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{front.description}</p>
                  </CardContent>
                </Card>
              </AnimateOnView>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Features;
