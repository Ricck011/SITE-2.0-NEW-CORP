import { fetchPriority } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAutoRotateTabs } from "@/hooks/use-auto-rotate-tabs";
import { HERO_SHOWCASE } from "@/content/deliverables";
import { Pause, Play } from "lucide-react";

// Vitrine de trabalho real no topo: imagem grande + 3 miniaturas que trocam
// sozinhas (mesmo mecanismo das abas do painel — abas/case-tabs.tsx), com o
// emblema "carimbado" no canto.
const HeroShowcase = () => {
  const itemIds = HERO_SHOWCASE.map((item) => item.id);
  const { activeId, isPaused, isManuallyPaused, containerRef, handleValueChange, handleBarAnimationEnd, togglePause } =
    useAutoRotateTabs({ itemIds });

  const activeItem = HERO_SHOWCASE.find((item) => item.id === activeId) ?? HERO_SHOWCASE[0];

  return (
    <div className="relative">
      <Tabs value={activeId} onValueChange={handleValueChange}>
        <div
          ref={containerRef}
          data-autorotate-paused={isPaused}
          onAnimationEnd={handleBarAnimationEnd}
          className="rounded-md border border-border bg-card overflow-hidden"
        >
          <div className="relative w-full aspect-[16/10]">
            {HERO_SHOWCASE.map((item, index) => (
              <TabsContent
                key={item.id}
                value={item.id}
                forceMount
                aria-hidden={item.id !== activeId}
                tabIndex={item.id === activeId ? 0 : -1}
                className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out data-[state=active]:opacity-100"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  {...fetchPriority(index === 0 ? "high" : undefined)}
                  width="1440"
                  height="900"
                />
              </TabsContent>
            ))}
            <span className="absolute top-3 left-3 z-10 rounded-sm bg-background/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              {activeItem.label}
            </span>
          </div>

          <div className="flex items-center gap-1 border-t border-border px-3 py-2.5">
            <TabsList className="flex-1 gap-1.5">
              {HERO_SHOWCASE.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  aria-label={item.label}
                  className="relative flex-1 h-[3px] rounded-full bg-border overflow-hidden"
                >
                  <span aria-hidden className="tab-fill-bar absolute inset-0 h-full bg-primary" />
                </TabsTrigger>
              ))}
            </TabsList>
            <button
              type="button"
              onClick={togglePause}
              aria-pressed={isManuallyPaused}
              aria-label={isManuallyPaused ? "Retomar troca automática das imagens" : "Pausar troca automática das imagens"}
              className="shrink-0 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-brand-surface-hover transition-colors"
            >
              {isManuallyPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </Tabs>

      <div className="absolute -left-6 -bottom-6 sm:-left-8 sm:-bottom-8 z-10 w-[90px] sm:w-[120px] xl:w-[140px]">
        <img
          src="/images/marca/newcorp-nc-mark.png"
          alt="Emblema NEW CORP"
          className="w-full h-auto"
          width="623"
          height="544"
          {...fetchPriority("high")}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default HeroShowcase;
