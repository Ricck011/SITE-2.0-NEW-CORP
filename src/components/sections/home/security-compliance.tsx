import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Texto aprovado na landing atual (CLAUDE-GERAL-\site, seção #sobre), com
// os 3 marcadores reformulados em cartão — sem inventar fato novo.
const SecurityCompliance = () => {
  const features = [
    {
      title: "Quatro anos de mercado",
      description: "Conhecendo as principais dores de clientes em todos os segmentos.",
    },
    {
      title: "Até 10 dias úteis",
      description: "Prazo de entrega, do primeiro papo ao site no ar.",
    },
    {
      title: "Arte e sistema juntos",
      description: "Feitos pela mesma pessoa, sem emendar fornecedor no meio do caminho.",
    },
  ];

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12" id="sobre-resumo">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        <div className="max-w-[683px]">
          <AnimateOnView once blur className="md:mb-4 mb-1.5">
            <Badge>Sobre</Badge>
          </AnimateOnView>

          <AnimateOnView once blur delay={0.1} className="h2 md:mb-6 mb-3">
            Quatro anos ouvindo a mesma dor.
          </AnimateOnView>

          <AnimateOnView once delay={0.2}>
            <p className="text-lg text-muted-foreground">
              A NEW CORP nasceu atendendo pequenas empresas de segmentos muito diferentes — e em todos eles o
              problema era o mesmo: o negócio funciona, mas ninguém acha, ninguém entende e nada fica registrado. A
              gente resolve os três de uma vez: a marca que apresenta, a página que converte e o sistema que
              organiza.
            </p>
          </AnimateOnView>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimateOnView key={feature.title} once delay={index * 0.1}>
              <Card className="h-full p-[30px] hover:bg-brand-surface-hover transition-colors">
                <CardContent className="flex flex-col gap-3 h-full">
                  <span className="font-mono text-xs text-brand-accent-soft">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="h5">{feature.title}</h3>
                  <p className="text-card-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </AnimateOnView>
          ))}
        </div>

        <AnimateOnView
          once
          delay={0.3}
          className="p-[27px] bg-brand-surface-2 border border-border flex flex-col md:flex-row items-center justify-center gap-3"
        >
          <p className="text-foreground text-lg text-center md:text-left max-w-[400px] md:max-w-full">
            Comece com um protótipo de uma tela, sem custo.
          </p>
          <Button className="bg-foreground text-background hover:bg-foreground/90" asChild>
            <Link to="/sobre">
              Conhecer a história completa
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default SecurityCompliance;
