import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAutoRotateTabs } from "@/hooks/use-auto-rotate-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CASE_TABS } from "@/content/deliverables";
import { FolderKanban, LayoutDashboard, Pause, Play, Users, Wallet } from "lucide-react";

const TAB_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  resumo: LayoutDashboard,
  clientes: Users,
  projetos: FolderKanban,
  financeiro: Wallet,
};

// Moldura de dashboard (padrão shadcnstore: menu lateral + área de
// conteúdo), com o print real de cada tela do painel — sem número, avatar
// ou gráfico inventado. Rotação/pausa/teclado seguem o mesmo mecanismo
// CSS-driven da etapa 3 (use-auto-rotate-tabs.ts), sem mexer no hook.
const CaseTabs = () => {
  const isMobile = useIsMobile();
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

  const activeItem = CASE_TABS.find((item) => item.id === activeId) ?? CASE_TABS[0];

  return (
    <Tabs value={activeId} onValueChange={handleValueChange} orientation={isMobile ? "horizontal" : "vertical"}>
      <div
        ref={containerRef}
        data-autorotate-paused={isPaused}
        onAnimationEnd={handleBarAnimationEnd}
        className="rounded-2xl md:rounded-4xl border border-border bg-card overflow-hidden md:grid md:grid-cols-[200px_1fr]"
      >
        <div className="flex flex-col border-b md:border-b-0 md:border-r border-border bg-brand-surface-2">
          <div className="hidden md:block px-4 pt-4 pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            NEW CORP · painel
          </div>

          <TabsList className="flex md:flex-col gap-1 px-2 pb-2 md:pb-4 overflow-x-auto">
            {CASE_TABS.map((item) => {
              const Icon = TAB_ICONS[item.id] ?? LayoutDashboard;
              return (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className={cn(
                    "relative shrink-0 md:w-full flex items-center gap-2 px-3 py-2.5 rounded-lg font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors",
                    "data-[state=active]:text-foreground data-[state=active]:bg-brand-surface-hover",
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden />
                  {item.label}
                  <span
                    aria-hidden
                    className="tab-fill-bar absolute inset-x-3 bottom-0 h-[2px] bg-brand-accent"
                  />
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <div>
          <div className="flex items-center gap-3 border-b border-border px-3 sm:px-4 py-2.5">
            <span className="font-mono text-xs text-muted-foreground">
              painel / <span className="text-foreground">{activeItem.label}</span>
            </span>
            <div
              aria-hidden
              className="hidden sm:flex flex-1 items-center rounded-sm border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground/70"
            >
              buscar…
            </div>
            <button
              type="button"
              onClick={togglePause}
              aria-pressed={isManuallyPaused}
              aria-label={isManuallyPaused ? "Retomar troca automática das abas" : "Pausar troca automática das abas"}
              className="ml-auto sm:ml-0 shrink-0 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-brand-surface-hover transition-colors"
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
                tabIndex={item.id === activeId ? 0 : -1}
                className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out data-[state=active]:opacity-100"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover object-top"
                  loading={index === 0 ? "eager" : "lazy"}
                  width="1440"
                  height="1000"
                />
              </TabsContent>
            ))}
          </div>
        </div>
      </div>
    </Tabs>
  );
};

export default CaseTabs;
