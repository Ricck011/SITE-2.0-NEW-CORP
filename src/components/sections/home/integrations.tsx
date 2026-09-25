import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { DELIVERABLES } from "@/content/deliverables";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

interface DeliverablePosition {
  x: number;
  y: number;
  scrollThreshold: number;
}

// Posições fixas ao redor do título (não sorteadas — ordem segue a ordem
// real da entrega). Distribuídas numa elipse pra caber na largura da seção.
function buildPositions(count: number): DeliverablePosition[] {
  const radiusX = 42;
  const radiusY = 36;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 50 + radiusX * Math.cos(angle),
      y: 50 + radiusY * Math.sin(angle),
      scrollThreshold: (i + 1) / (count + 1),
    };
  });
}

interface DeliverableItemProps {
  label: string;
  position: DeliverablePosition;
  scrollYProgress: MotionValue<number>;
}

const DeliverableBadge = ({ label, position, scrollYProgress }: DeliverableItemProps) => {
  const opacity = useTransform(
    scrollYProgress,
    [position.scrollThreshold - 0.15, position.scrollThreshold],
    [0, 1],
    { clamp: true },
  );
  const scale = useTransform(
    scrollYProgress,
    [position.scrollThreshold - 0.15, position.scrollThreshold],
    [0.8, 1],
    { clamp: true },
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        opacity,
        scale,
      }}
    >
      <span className="inline-flex items-center whitespace-nowrap rounded-sm border border-border bg-card px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-xs sm:text-sm text-foreground">
        {label}
      </span>
    </motion.div>
  );
};

const Integrations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const useSimpleLayout = isMobile || !!prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const positions = useMemo(() => buildPositions(DELIVERABLES.length), []);

  const title = (
    <h2 className="h2 text-center max-w-[560px] mx-auto mb-4">
      O que entra <span className="text-muted-foreground">na entrega</span>
    </h2>
  );

  if (useSimpleLayout) {
    // Sem tela grudando: a versão de hoje mantém o sticky em qualquer
    // aparelho e trava a rolagem no celular — corrigido aqui.
    return (
      <section ref={sectionRef} className="relative bg-card py-16" id="entrega">
        <Container className="space-y-8">
          <AnimateOnView>{title}</AnimateOnView>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DELIVERABLES.map((item, index) => (
              <AnimateOnView key={item.id} once delay={index * 0.05}>
                <span className="flex items-center justify-center text-center rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs sm:text-sm text-foreground h-full">
                  {item.label}
                </span>
              </AnimateOnView>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-card" id="entrega" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <Container className="relative z-10">
          <AnimateOnView>{title}</AnimateOnView>
        </Container>

        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {DELIVERABLES.map((item, index) => (
            <DeliverableBadge
              key={item.id}
              label={item.label}
              position={positions[index]}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
