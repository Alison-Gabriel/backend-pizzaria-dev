import prismaClient from "../../prisma";

interface AddOrderItemServiceProps {
  orderId: string;
  productId: string;
  amount: number;
}

export class AddOrderItemService {
  async execute({ orderId, productId, amount }: AddOrderItemServiceProps) {
    const order = await prismaClient.order.findFirst({
      where: { id: orderId },
    });

    const isOrderNotFound = !order;
    if (isOrderNotFound) {
      throw new Error("Order not found");
    }

    const product = await prismaClient.product.findFirst({
      where: {
        id: productId,
        disabled: false,
      },
    });

    const isProductNotFound = !product;
    if (isProductNotFound) {
      throw new Error("Product not found");
    }

    const addedOrderItem = await prismaClient.item.create({
      data: {
        orderId,
        productId,
        amount,
      },
      select: {
        id: true,
        amount: true,
        orderId: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            banner: true,
          },
        },
      },
    });

    return addedOrderItem;
  }
}
