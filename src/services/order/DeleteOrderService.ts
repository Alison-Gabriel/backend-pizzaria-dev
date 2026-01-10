import prismaClient from "../../prisma";

interface DeleteOrderServiceProps {
  orderId: string;
}

export class DeleteOrderService {
  async execute({ orderId }: DeleteOrderServiceProps) {
    const order = await prismaClient.order.findFirst({
      where: { id: orderId },
    });

    const isOrderNotFound = !order;
    if (isOrderNotFound) {
      throw new Error("Order not found/exists");
    }

    const deletedOrder = await prismaClient.order.delete({
      where: { id: order.id },
    });

    return deletedOrder;
  }
}
