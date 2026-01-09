import type { Request, Response } from "express";
import { DeactivateProductService } from "../../services/product/DeactivateProductService";

export class DeactivateProductController {
  async handle(req: Request, res: Response) {
    const { productId } = req.body;

    const deactivateProductService = new DeactivateProductService();
    const product = await deactivateProductService.execute({ productId });

    return res.status(201).json(product);
  }
}
