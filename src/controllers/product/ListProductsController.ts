import type { Request, Response } from "express";
import { ListProductsService } from "../../services/product/ListProductsService";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    const disabledQuery = String(req.query.disabled);
    const disabled = disabledQuery === "true" ? true : false;

    const listProductsService = new ListProductsService();
    const products = await listProductsService.execute({ disabled });

    return res.status(200).json(products);
  }
}
