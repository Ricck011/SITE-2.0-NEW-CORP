import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CONTACT_BADGE,
  CONTACT_CONSENT_LINK_HREF,
  CONTACT_CONSENT_LINK_TEXT,
  CONTACT_CONSENT_TEXT_PREFIX,
  CONTACT_INTEREST_LABEL,
  CONTACT_INTEREST_OPTIONS,
  CONTACT_LEDE,
  CONTACT_NAME_PLACEHOLDER,
  CONTACT_PHONE_PLACEHOLDER,
  CONTACT_SENT_MESSAGE_TEMPLATE,
  CONTACT_SENT_TITLE,
  CONTACT_SUBMIT_LABEL,
  CONTACT_TITLE,
  CONTACT_WHATSAPP_CTA,
} from "@/content/contact";
import { waLink } from "@/content/site";
import { fillNameTemplate, getFirstName } from "@/lib/format";
import { formatPhoneBR } from "@/lib/phone-mask";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";

const ContactForm = () => {
  const [sent, setSent] = useState<ContactFormValues | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      interesse: "",
      consentimento: false as unknown as true,
    },
  });

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 bg-background" id="contato">
      <Container className="space-y-10">
        <div className="max-w-[683px]">
          <AnimateOnView once blur className="md:mb-4 mb-1.5">
            <Badge variant="secondary">{CONTACT_BADGE}</Badge>
          </AnimateOnView>
          <AnimateOnView once blur delay={0.2} className="md:mb-6 mb-3">
            <h2 className="h2 text-foreground">{CONTACT_TITLE}</h2>
          </AnimateOnView>
          <AnimateOnView once blur delay={0.4}>
            <p className="text-lg text-muted-foreground">{CONTACT_LEDE}</p>
          </AnimateOnView>
        </div>

        <AnimateOnView once delay={0.3} className="max-w-[560px]">
          <div className="rounded-2xl border border-border bg-brand-surface-2 p-5 sm:p-8">
            {sent ? (
              <div className="space-y-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="h5 text-foreground">{CONTACT_SENT_TITLE}</h3>
                  <p className="text-muted-foreground">
                    {fillNameTemplate(CONTACT_SENT_MESSAGE_TEMPLATE, sent.nome)}
                  </p>
                </div>
                <Button asChild>
                  <a
                    href={waLink(
                      `Olá! Sou ${getFirstName(sent.nome)} e acabei de pedir um protótipo no site${
                        sent.interesse ? `. Interesse: ${sent.interesse}` : ""
                      }`,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {CONTACT_WHATSAPP_CTA}
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </a>
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => setSent(values))} className="space-y-5">
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
                    name="interesse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">{CONTACT_INTEREST_LABEL}</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={CONTACT_INTEREST_LABEL} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CONTACT_INTEREST_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                          </FormControl>
                          <FormLabel className="text-sm font-normal leading-relaxed text-muted-foreground">
                            {CONTACT_CONSENT_TEXT_PREFIX}
                            <a href={CONTACT_CONSENT_LINK_HREF} className="text-brand-accent-soft underline">
                              {CONTACT_CONSENT_LINK_TEXT}
                            </a>
                            .
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">
                    {CONTACT_SUBMIT_LABEL}
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default ContactForm;
