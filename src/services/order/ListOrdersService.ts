import prismaClient from "../../prisma";

interface ListOrdersServiceProps {
  draft?: boolean;
}

export class ListOrdersService {
  async execute({ draft }: ListOrdersServiceProps) {
    try {
      const orders = await prismaClient.order.findMany({
        where: { draft },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              amount: true,
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
          },
        },
      });

      return orders;
    } catch (error) {
      throw new Error("Error on orders listing");
    }
  }
}
