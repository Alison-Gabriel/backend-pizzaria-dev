import type { Request, Response } from "express";
import { ListProductsService } from "../../services/product/ListProductsService";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    const queryDisabled = Boolean(req.query.disabled);

    const listProductsService = new ListProductsService();
    const products = await listProductsService.execute({
      disabled: queryDisabled,
    });

    return res.status(200).json(products);
  }
}
