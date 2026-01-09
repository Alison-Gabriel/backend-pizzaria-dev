import prismaClient from "../../prisma";

interface ListProductsServiceProps {
  disabled: boolean;
}

export class ListProductsService {
  async execute({ disabled }: ListProductsServiceProps) {
    const products = await prismaClient.product.findMany({
      where: { disabled },
      select: {
        id: true,
        name: true,
        price: true,
        banner: true,
        description: true,
        disabled: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  }
}
