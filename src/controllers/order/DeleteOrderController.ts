import type { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

export class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const orderId = String(req.query.order_id);

    const deleteOrderService = new DeleteOrderService();
    const deletedOrder = await deleteOrderService.execute({ orderId });

    return res.status(200).json(deletedOrder);
  }
}
