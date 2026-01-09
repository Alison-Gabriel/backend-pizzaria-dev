import type { Request, Response } from "express";
import { RemoveOrderItemService } from "../../services/order/RemoveOrderItemService";

export class RemoveOrderItemController {
  async handle(req: Request, res: Response) {
    const orderItemId = String(req.query.item_id);

    const removeOrderItemService = new RemoveOrderItemService();
    const removedOrderItem = await removeOrderItemService.execute({
      orderItemId,
    });

    return res.status(200).json(removedOrderItem);
  }
}
