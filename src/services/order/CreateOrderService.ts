import prismaClient from "../../prisma";

interface CreateOrderServiceProps {
  table: number;
  name?: string;
}

export class CreateOrderService {
  async execute({ table, name }: CreateOrderServiceProps) {
    try {
      const createdOrder = await prismaClient.order.create({
        data: {
          table,
          name,
        },
        select: {
          id: true,
          name: true,
          table: true,
          draft: true,
          status: true,
          createdAt: true,
        },
      });
      return createdOrder;
    } catch (error) {
      throw new Error("Error on order creation");
    }
  }
}
