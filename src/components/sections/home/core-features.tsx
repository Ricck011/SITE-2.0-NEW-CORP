import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CaseTabs from "./case-tabs";

const CoreFeatures = () => {
  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12" id="cases">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between md:gap-8 gap-4">
          <div className="flex-1 max-w-[683px]">
            <AnimateOnView once blur className="md:mb-4 mb-1.5">
              <Badge>Case real</Badge>
            </AnimateOnView>

            <AnimateOnView once blur delay={0.2} className="h2 md:mb-6 mb-3">
              O painel que eu mesmo uso
            </AnimateOnView>

            <AnimateOnView once delay={0.3} className="text-lg text-muted-foreground">
              Resumo, clientes, projetos e financeiro — o mesmo sistema que roda os projetos da NEW CORP, por dentro.
            </AnimateOnView>
          </div>

          <AnimateOnView once delay={0.4}>
            <Button asChild>
              <Link to="/#contato">
                Quero um sistema assim
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </AnimateOnView>
        </div>

        <AnimateOnView once y={40} delay={0.5}>
          <CaseTabs />
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default CoreFeatures;
