import { z } from "zod";
import { isValidPhoneBR } from "@/lib/phone-mask";

// Schema base de lead (nome + WhatsApp + consentimento LGPD), reaproveitado
// pelo passo final do diagnóstico e pelo formulário de contato.
export const leadBaseSchema = z.object({
  nome: z.string().trim().min(2, "Digite seu nome."),
  whatsapp: z.string().refine(isValidPhoneBR, "Digite o WhatsApp com DDD."),
  consentimento: z.literal(true, { message: "Precisa aceitar pra continuar." }),
});

export type LeadFormValues = z.infer<typeof leadBaseSchema>;

export const contactFormSchema = leadBaseSchema.extend({
  interesse: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
