import type { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, category_id, description } = req.body;

    if (!req.file) {
      throw new Error("Missing product image");
    }

    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      name,
      price,
      category_id,
      description,
      imageBuffer: req.file.buffer,
      imageName: req.file.originalname,
    });

    return res.json(product);
  }
}
