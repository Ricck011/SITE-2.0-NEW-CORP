import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { DELIVERABLES, type DeliverableItem } from "@/content/deliverables";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FolderKanban,
  Hexagon,
  LayoutTemplate,
  MessageCircle,
  Palette,
  Smartphone,
  Type,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

// O ícone mora aqui e não no arquivo de conteúdo: assim `deliverables.ts`
// continua sendo só dado, sem importar componente.
const ICONS: Record<string, LucideIcon> = {
  Hexagon,
  Palette,
  Type,
  BookOpen,
  LayoutTemplate,
  ClipboardList,
  MessageCircle,
  Users,
  FolderKanban,
  Wallet,
  BarChart3,
  Smartphone,
};

// A ordem das colunas é a ordem em que o trabalho acontece.
const FRONTS = [
  { id: "Marca", title: "Marca", note: "Como a empresa aparece" },
  { id: "Web", title: "Web", note: "Onde o cliente chega" },
  { id: "Sistema", title: "Sistema", note: "Como a operação se sustenta" },
] as const;

const DeliverableRow = ({ item }: { item: DeliverableItem }) => {
  const Icon = ICONS[item.icon];
  return (
    <li className="flex gap-3.5">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-brand-accent-soft">
        {Icon ? <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" /> : null}
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold leading-snug text-foreground">{item.label}</p>
        <p className="mt-1 text-sm leading-[1.5] text-muted-foreground">{item.description}</p>
      </div>
    </li>
  );
};

const Integrations = () => {
  // Uma coluna por frente. A versão anterior espalhava as 12 etiquetas numa
  // elipse presa à rolagem: pedia 3 telas de rolagem, cortava "Manual de
  // marca" na borda direita e não dizia o que cada item era.
  return (
    <section className="relative bg-card py-20 md:py-24 lg:py-28" id="entrega">
      <Container>
        <AnimateOnView>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">O que entra na entrega</p>
          <h2 className="h2 mt-3 max-w-[18ch]">
            Doze entregas, <span className="text-muted-foreground">nenhuma surpresa.</span>
          </h2>
          <p className="paragraph-large mt-5 max-w-[56ch] text-muted-foreground">
            Está tudo listado antes de você pagar a primeira parcela. O que não estiver aqui, eu falo na hora — não
            aparece como extra depois.
          </p>
        </AnimateOnView>

        <div className="mt-12 grid gap-x-10 gap-y-12 md:mt-16 lg:grid-cols-3">
          {FRONTS.map((front, frontIndex) => {
            const items = DELIVERABLES.filter((item) => item.front === front.id);
            return (
              <AnimateOnView key={front.id} delay={frontIndex * 0.08}>
                <div
                  className={cn(
                    "h-full lg:pl-10",
                    // A linha divide as colunas no desktop; empilhado, ela sumiria
                    // no meio do texto, então só aparece a partir de lg.
                    frontIndex > 0 && "lg:border-l lg:border-border",
                  )}
                >
                  <div className="flex items-baseline gap-3 border-b border-border pb-4">
                    <h3 className="h5">{front.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-brand-accent-soft">
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{front.note}</p>

                  <ul className="mt-7 space-y-6">
                    {items.map((item) => (
                      <DeliverableRow key={item.id} item={item} />
                    ))}
                  </ul>
                </div>
              </AnimateOnView>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Integrations;
