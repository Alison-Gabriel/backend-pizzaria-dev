import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.coerce.number<number>().positive({
      error: "Informe uma mesa válida.",
    }),
    name: z
      .string({
        error: "Informe um nome válido",
      })
      .trim()
      .optional(),
  }),
});

export const listOrdersSchema = z.object({
  query: z.object({
    draft: z
      .enum(["true", "false"], {
        error: "Escolha somente 'true' ou 'false'",
      })
      .optional()
      .default("false")
      .transform((value) => value === "true"),
  }),
});

export const addOrderItemSchema = z.object({
  body: z.object({
    orderId: z.uuid(),
    productId: z.uuid(),
    amount: z.coerce
      .number<number>({
        error: "Insira uma quantidade válida.",
      })
      .int({
        error: "A quantidade não pode ser decimal.",
      })
      .positive({
        error: "A quantidade deve ser maior que zero.",
      }),
  }),
});

export const removeOrderItemSchema = z.object({
  query: z.object({
    item_id: z.uuid(),
  }),
});
