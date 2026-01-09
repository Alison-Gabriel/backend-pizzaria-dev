import prismaClient from "../../prisma";

interface ListProductsByCategoryServiceProps {
  categoryId: string;
}

export class ListProductsByCategoryService {
  async execute({ categoryId }: ListProductsByCategoryServiceProps) {
    const category = await prismaClient.category.findFirst({
      where: { id: categoryId },
      select: {
        id: true,
      },
    });

    const isCategoryNotFounded = !category;
    if (isCategoryNotFounded) {
      throw new Error("Category not found/not exists.");
    }

    const categoryProducts = await prismaClient.product.findMany({
      where: {
        categoryId: category.id,
        disabled: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        banner: true,
        price: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return categoryProducts;
  }
}
