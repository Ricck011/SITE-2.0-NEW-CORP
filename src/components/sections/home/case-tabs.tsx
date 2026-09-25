import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAutoRotateTabs } from "@/hooks/use-auto-rotate-tabs";
import { cn } from "@/lib/utils";
import { CASE_TABS } from "@/content/deliverables";
import { Pause, Play } from "lucide-react";

const CaseTabs = () => {
  const itemIds = CASE_TABS.map((item) => item.id);
  const {
    activeId,
    isPaused,
    isManuallyPaused,
    containerRef,
    handleValueChange,
    handleBarAnimationEnd,
    togglePause,
  } = useAutoRotateTabs({ itemIds });

  return (
    <Tabs value={activeId} onValueChange={handleValueChange}>
      <div
        ref={containerRef}
        data-autorotate-paused={isPaused}
        onAnimationEnd={handleBarAnimationEnd}
        className="rounded-2xl md:rounded-4xl border border-border bg-card overflow-hidden"
      >
        <div className="flex items-center gap-1 border-b border-border px-2 sm:px-4">
          <TabsList className="flex-1 justify-start gap-1 overflow-x-auto">
            {CASE_TABS.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className={cn(
                  "px-3 sm:px-4 py-4 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className="tab-fill-bar absolute inset-x-0 bottom-0 h-[2px] bg-brand-red"
                />
              </TabsTrigger>
            ))}
          </TabsList>

          <button
            type="button"
            onClick={togglePause}
            aria-pressed={isManuallyPaused}
            aria-label={isManuallyPaused ? "Retomar troca automática das abas" : "Pausar troca automática das abas"}
            className="shrink-0 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-brand-surface-hover transition-colors"
          >
            {isManuallyPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        <div className="relative w-full aspect-[1440/1000]">
          {CASE_TABS.map((item, index) => (
            <TabsContent
              key={item.id}
              value={item.id}
              forceMount
              aria-hidden={item.id !== activeId}
              className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out data-[state=active]:opacity-100"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                width="1440"
                height="1000"
              />
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  );
};

export default CaseTabs;
