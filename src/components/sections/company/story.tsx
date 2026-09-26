import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { SOBRE_STORY } from "@/content/sobre";

// Substitui o "CEO Profile" do template, que trazia uma pessoa inventada
// (James Whitaker) com foto e assinatura de banco de imagem.
const Story = () => {
  return (
    <section className="bg-card py-20 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <AnimateOnView>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Como cheguei aqui</p>
            </AnimateOnView>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-6">
              {SOBRE_STORY.map((paragraph, index) => (
                <AnimateOnView key={index} delay={index * 0.08}>
                  <p
                    className={
                      // O primeiro parágrafo entra maior: é ele que prende
                      // quem só vai ler o começo.
                      index === 0
                        ? "text-xl leading-[1.5] text-foreground md:text-[26px] md:leading-[1.4]"
                        : "paragraph-large text-muted-foreground"
                    }
                  >
                    {paragraph}
                  </p>
                </AnimateOnView>
              ))}
            </div>

            <AnimateOnView delay={0.3}>
              <p className="mt-10 border-l-2 border-brand-accent pl-5 font-display text-lg font-semibold tracking-[-0.01em] text-foreground">
                Pedro Henrique
                <span className="mt-1 block text-sm font-normal tracking-normal text-muted-foreground">
                  Fundador da NEW CORP STUDIO
                </span>
              </p>
            </AnimateOnView>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Story;
