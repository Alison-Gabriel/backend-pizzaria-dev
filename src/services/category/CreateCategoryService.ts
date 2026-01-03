import prismaClient from "../../prisma";

interface CreateCategoryServiceProps {
  name: string;
}

export class CreateCategoryService {
  async execute({ name }: CreateCategoryServiceProps) {
    const category = await prismaClient.category.create({
      data: { name },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
    return category;
  }
}
