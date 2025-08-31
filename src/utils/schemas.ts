import { z } from "zod";

const nonEmpty = (msg = "Obrigatório") => z.string().trim().min(1, msg);

export const messageSchema = z.object({
  title: nonEmpty(),
  text: z.string().optional(),
  mediaUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

export const questionSchema = z.object({
  title: nonEmpty(),
  prompt: nonEmpty(),
  options: z
    .array(z.object({ id: nonEmpty(), label: nonEmpty("Informe um rótulo") }))
    .min(1, "Informe pelo menos uma opção"),
});

export const conditionSchema = z.object({
  title: nonEmpty(),
  expression: nonEmpty(),
});

export const delaySchema = z.object({
  title: nonEmpty(),
  ms: z.number().positive("Deve ser um número positivo"),
});

export const apiSchema = z.object({
  title: nonEmpty(),
  url: nonEmpty().url("URL inválida"),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  headers: z.array(z.object({ key: z.string().optional(), value: z.string().optional() })).optional(),
  bodyTemplate: z.string().optional(),
});

export const startSchema = z.object({ title: nonEmpty() });
export const endSchema = z.object({ title: nonEmpty() });

export const schemas = {
  start: startSchema,
  end: endSchema,
  message: messageSchema,
  question: questionSchema,
  condition: conditionSchema,
  delay: delaySchema,
  api: apiSchema,
};

