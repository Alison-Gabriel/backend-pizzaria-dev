import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Digite um nome válido." })
      .min(3, { error: "O nome precisa ter no mínimo 3 caracteres." }),
    email: z.email({ error: "Digite um e-mail válido." }),
    password: z
      .string({ error: "Digite uma senha válida." })
      .min(6, { error: "A senha precisa ter no mínimo 6 caracteres." }),
  }),
});

export const authUserSchema = z.object({
  body: z.object({
    email: z
      .email({ error: "Digite um e-mail válido." })
      .min(1, { error: "O e-mail é obrigatório." }),
    password: z
      .string({ error: "Digite uma senha válida." })
      .min(1, { error: "A senha é obrigatória." }),
  }),
});
