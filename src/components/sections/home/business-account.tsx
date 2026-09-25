import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import StepsTrail from "@/components/ui/steps-trail";
import { HOW_IT_WORKS_STEPS, HOW_IT_WORKS_TITLE } from "@/content/how-it-works";

const BusinessAccount = () => {
  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12" id="como-funciona">
      <Container className="max-w-[720px]">
        <AnimateOnView once blur className="md:mb-4 mb-1.5">
          <Badge>Como funciona</Badge>
        </AnimateOnView>

        <AnimateOnView once blur delay={0.1} className="h2 md:mb-12 mb-8">
          {HOW_IT_WORKS_TITLE}
        </AnimateOnView>

        <StepsTrail steps={HOW_IT_WORKS_STEPS} />
      </Container>
    </section>
  );
};

export default BusinessAccount;
