import prismaClient from "../../prisma";

interface SendOrderServiceProps {
  name?: string;
  orderId: string;
}

export class SendOrderService {
  async execute({ orderId, name }: SendOrderServiceProps) {
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
        draft: false,
        name,
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        createdAt: true,
      },
    });

    return updatedOrder;
  }
}
