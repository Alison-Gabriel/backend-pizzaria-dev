import type { Request, Response } from "express";
import { ListProductsByCategoryService } from "../../services/product/ListProductsByCategoryService";

export class ListProductsByCategoryController {
  async handle(req: Request, res: Response) {
    const categoryId = String(req.query.categoryId);

    const listProductsByCategoryService = new ListProductsByCategoryService();
    const categoryProducts = await listProductsByCategoryService.execute({
      categoryId,
    });

    return res.status(200).json(categoryProducts);
  }
}
