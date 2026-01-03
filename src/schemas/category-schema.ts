import z from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        error: "Digite um nome válido para a categoria.",
      })
      .min(3, {
        error: "O nome da categoria deve ter pelo menos 3 caracteres.",
      }),
  }),
});
