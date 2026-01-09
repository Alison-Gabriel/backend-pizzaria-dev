import prismaClient from "../../prisma";

export class ListCategoriesService {
  async execute() {
    try {
      const categories = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return categories;
    } catch (error) {
      throw new Error(
        "Unexpected error on categories search, please try again later."
      );
    }
  }
}
