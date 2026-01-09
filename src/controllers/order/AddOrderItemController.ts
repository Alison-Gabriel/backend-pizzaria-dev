import type { Request, Response } from "express";
import { AddOrderItemService } from "../../services/order/AddOrderItemService";

export class AddOrderItemController {
  async handle(req: Request, res: Response) {
    const { orderId, productId, amount } = req.body;

    const addOrderItemService = new AddOrderItemService();
    const addedOrderItem = await addOrderItemService.execute({
      orderId,
      productId,
      amount,
    });

    return res.status(201).json(addedOrderItem);
  }
}
