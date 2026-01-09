import prismaClient from "../../prisma";

interface RemoveOrderItemServiceProps {
  orderItemId: string;
}

export class RemoveOrderItemService {
  async execute({ orderItemId }: RemoveOrderItemServiceProps) {
    const orderItem = await prismaClient.item.findFirst({
      where: { id: orderItemId },
    });

    const isOrderItemNotFound = !orderItem;
    if (isOrderItemNotFound) {
      throw new Error("Order item not founded.");
    }

    const removedOrderItem = await prismaClient.item.delete({
      where: { id: orderItem.id },
    });

    return removedOrderItem;
  }
}
