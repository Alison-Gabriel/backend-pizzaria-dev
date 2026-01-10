import prismaClient from "../../prisma";

interface FinishOrderServiceProps {
  orderId: string;
}

export class FinishOrderService {
  async execute({ orderId }: FinishOrderServiceProps) {
    const order = await prismaClient.order.findFirst({
      where: { id: orderId },
    });

    const isOrderNotFound = !order;
    if (isOrderNotFound) {
      throw new Error("Order not found/exists");
    }

    const updatedOrder = await prismaClient.order.update({
      where: { id: order.id },
      data: {
        status: true,
      },
      select: {
        id: true,
        name: true,
        draft: true,
        status: true,
        table: true,
        createdAt: true,
      },
    });

    return updatedOrder;
  }
}
