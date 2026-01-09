import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: "Digite um nome válido para o produto.",
      })
      .trim()
      .min(1, {
        error: "O nome do produto é obrigatório.",
      }),
    price: z.coerce
      .number<number>({
        error: "O preço do produto é obrigatório.",
      })
      .positive({
        error: "Digite um preço válido.",
      }),
    description: z
      .string({
        error: "Digite um preço válido para o produto.",
      })
      .trim()
      .min(1, {
        error: "A descrição do produto é obrigatória.",
      }),
    category_id: z.uuid({
      error: "Escolha uma categoria válida.",
    }),
  }),
});
