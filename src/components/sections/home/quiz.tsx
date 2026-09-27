import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  QUIZ_BADGE,
  QUIZ_DONE_KICKER,
  QUIZ_LEAD_CONSENT_TEXT,
  QUIZ_LEAD_KICKER,
  QUIZ_LEAD_SUBMIT_LABEL,
  QUIZ_LEAD_TITLE,
  QUIZ_LEDE,
  QUIZ_NEXT_STEP_LABEL,
  QUIZ_NEXT_STEP_TEXT,
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  QUIZ_TITLE,
  QUIZ_WHATSAPP_CTA,
} from "@/content/quiz";
import { CONTACT_NAME_PLACEHOLDER, CONTACT_PHONE_PLACEHOLDER } from "@/content/contact";
import { waLink } from "@/content/site";
import { fillNameTemplate, getFirstName } from "@/lib/format";
import { formatPhoneBR } from "@/lib/phone-mask";
import { getNextStepVariant, getQuizResultId } from "@/lib/quiz";
import { leadBaseSchema, type LeadFormValues } from "@/lib/validation";

type QuizStage = "ask" | "lead" | "done";

const Quiz = () => {
  const [stage, setStage] = useState<QuizStage>("ask");
  const [answers, setAnswers] = useState<string[]>([]);
  const [lead, setLead] = useState<LeadFormValues | null>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadBaseSchema),
    defaultValues: { nome: "", whatsapp: "", consentimento: false as unknown as true },
  });

  const currentIndex = answers.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const progress = (currentIndex / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (option: string) => {
    const next = [...answers, option];
    setAnswers(next);
    if (next.length === QUIZ_QUESTIONS.length) setStage("lead");
  };

  const handleBack = () => {
    setAnswers((prev) => prev.slice(0, -1));
    setStage("ask");
  };

  const resultId = getQuizResultId(answers);
  const result = QUIZ_RESULTS[resultId];
  const nextStep = QUIZ_NEXT_STEP_TEXT[getNextStepVariant(answers[3] ?? "")];

  // O diagnóstico não salva o lead em lugar nenhum — o WhatsApp é o único
  // registro que sobra. Abre sozinho ao enviar, mesmo tratamento do
  // contact-form.tsx, em vez de esperar o segundo clique no botão da tela de
  // resultado (que aqui tem conteúdo de verdade pra ler, então o clique
  // continua disponível como reforço, não como único caminho).
  const handleLeadSubmit = (values: LeadFormValues) => {
    setLead(values);
    setStage("done");
    window.open(
      waLink(`Olá! Sou ${getFirstName(values.nome)} e acabei de fazer o diagnóstico no site. Resultado: ${result.title}`),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 bg-background" id="diagnostico">
      <Container className="space-y-10">
        <div className="max-w-[683px]">
          <AnimateOnView once blur className="md:mb-4 mb-1.5">
            <Badge variant="secondary">{QUIZ_BADGE}</Badge>
          </AnimateOnView>
          <AnimateOnView once blur delay={0.2} className="md:mb-6 mb-3">
            <h2 className="h2 text-foreground">{QUIZ_TITLE}</h2>
          </AnimateOnView>
          <AnimateOnView once blur delay={0.4}>
            <p className="text-lg text-muted-foreground">{QUIZ_LEDE}</p>
          </AnimateOnView>
        </div>

        <AnimateOnView once delay={0.3} className="max-w-[760px]">
          <div className="rounded-2xl border border-border bg-brand-surface-2 p-5 sm:p-8">
            {stage === "ask" && currentQuestion && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    <span>
                      pergunta {currentIndex + 1} de {QUIZ_QUESTIONS.length}
                    </span>
                    {currentIndex > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <ArrowLeft className="h-3 w-3" />
                        voltar
                      </button>
                    )}
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={currentIndex}
                    aria-valuemin={0}
                    aria-valuemax={QUIZ_QUESTIONS.length}
                    aria-label="Progresso do diagnóstico"
                    className="h-[3px] w-full overflow-hidden rounded-full bg-border"
                  >
                    <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <h3 className="h5 text-foreground">{currentQuestion.question}</h3>

                <div className="flex flex-col gap-2.5">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(option)}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {option}
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {stage === "lead" && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLeadSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {QUIZ_LEAD_KICKER}
                    </p>
                    <h3 className="h5 text-foreground">{QUIZ_LEAD_TITLE}</h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">{CONTACT_NAME_PLACEHOLDER}</FormLabel>
                        <FormControl>
                          <Input placeholder={CONTACT_NAME_PLACEHOLDER} autoComplete="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">{CONTACT_PHONE_PLACEHOLDER}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={CONTACT_PHONE_PLACEHOLDER}
                            inputMode="tel"
                            autoComplete="tel"
                            {...field}
                            onChange={(event) => field.onChange(formatPhoneBR(event.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consentimento"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal leading-relaxed text-muted-foreground">
                            {QUIZ_LEAD_CONSENT_TEXT}
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">
                    {QUIZ_LEAD_SUBMIT_LABEL}
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </Button>
                </form>
              </Form>
            )}

            {stage === "done" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-accent-soft">
                    {QUIZ_DONE_KICKER}
                  </p>
                  <h3 className="h5 text-foreground">{result.title}</h3>
                  <p className="text-muted-foreground">
                    {fillNameTemplate(result.introTemplate, lead?.nome ?? "")}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {result.recommendations.map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="shrink-0 font-mono text-xs text-brand-accent-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {QUIZ_NEXT_STEP_LABEL}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{nextStep}</p>
                </div>

                <Button asChild>
                  <a
                    href={waLink(
                      `Olá! Sou ${getFirstName(lead?.nome ?? "")} e acabei de fazer o diagnóstico no site. Resultado: ${result.title}`,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {QUIZ_WHATSAPP_CTA}
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default Quiz;
