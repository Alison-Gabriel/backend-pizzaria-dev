import prismaClient from "../../prisma";

interface DeactivateProductServiceProps {
  productId: string;
}

export class DeactivateProductService {
  async execute({ productId }: DeactivateProductServiceProps) {
    const productToDeactivate = await prismaClient.product.findFirst({
      where: { id: productId },
    });

    const isProductNotFound = !productToDeactivate;
    if (isProductNotFound) {
      throw new Error("Product not found.");
    }

    const isProductAlreadyInactive = productToDeactivate.disabled;
    if (isProductAlreadyInactive) {
      throw new Error("Product already inactive.");
    }

    const deactivatedProduct = await prismaClient.product.update({
      where: { id: productToDeactivate.id },
      data: { disabled: true },
    });

    return deactivatedProduct;
  }
}
