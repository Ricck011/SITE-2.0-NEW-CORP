import { useScrollRailProgress } from "@/hooks/use-scroll-rail-progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface StepsTrailProps {
  steps: Step[];
  className?: string;
}

// Trilha vertical numerada com linha de progresso acompanhando o scroll.
// Todos os passos ficam visíveis ao mesmo tempo (empilhados).
const StepsTrail = ({ steps, className }: StepsTrailProps) => {
  const { containerRef, fillScaleY } = useScrollRailProgress();

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="absolute left-5 top-2 bottom-2 w-px bg-border" aria-hidden />
      <motion.div
        className="absolute left-5 top-2 bottom-2 w-px bg-primary origin-top"
        style={{ scaleY: fillScaleY }}
        aria-hidden
      />

      <ol className="space-y-10">
        {steps.map((step) => (
          <li key={step.number} className="relative pl-14">
            <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card font-mono text-sm text-brand-accent-soft">
              {step.number}
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StepsTrail;
