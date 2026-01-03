import type { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/create-category-service";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const createCategoryService = new CreateCategoryService();
    const createdCategory = await createCategoryService.execute({ name });

    return res.status(201).json(createdCategory);
  }
}
