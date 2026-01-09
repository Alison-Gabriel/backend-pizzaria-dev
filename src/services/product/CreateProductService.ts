import { Readable } from "node:stream";
import cloudinary from "../../config/cloudinary";
import prismaClient from "../../prisma";
import { UploadApiResponse } from "cloudinary";

interface CreateProductServiceProps {
  name: string;
  price: number;
  description: string;
  category_id: string;
  imageBuffer: Buffer;
  imageName: string;
}

export class CreateProductService {
  async execute({
    name,
    price,
    description,
    category_id,
    imageBuffer,
    imageName,
  }: CreateProductServiceProps) {
    const category = await prismaClient.category.findFirst({
      where: { id: category_id },
    });
    const isCategoryNotExists = !category;

    if (isCategoryNotExists) {
      throw new Error("Category not founded.");
    }

    let bannerUrl: string;

    try {
      const result = await new Promise<UploadApiResponse | undefined>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "products",
              resource_type: "image",
              public_id: `${Date.now()}-${imageName.split(".")[0]}`,
            },
            (error, result) => {
              if (error) {
                reject(error);
              }
              resolve(result);
            }
          );

          const bufferStream = Readable.from(imageBuffer);
          bufferStream.pipe(uploadStream);
        }
      );

      bannerUrl = String(result?.secure_url);
    } catch (error) {
      throw new Error("Error on image upload, please try again later.");
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        price: Number(price),
        description,
        banner: bannerUrl,
        categoryId: category_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        categoryId: true,
        banner: true,
        createdAt: true,
      },
    });

    return product;
  }
}
