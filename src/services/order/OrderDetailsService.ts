import prismaClient from "../../prisma";

interface OrderDetailsServiceProps {
  orderId: string;
}

export class OrderDetailsService {
  async execute({ orderId }: OrderDetailsServiceProps) {
    const order = await prismaClient.order.findFirst({
      where: { id: orderId },
      select: {
        id: true,
        name: true,
        draft: true,
        status: true,
        table: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            amount: true,
            createdAt: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                disabled: true,
                description: true,
                banner: true,
                createdAt: true,
                category: {
                  select: {
                    name: true,
                    id: true,
                    createdAt: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const isOrderNotFound = !order;
    if (isOrderNotFound) {
      throw new Error("Order not found.");
    }

    return order;
  }
}
