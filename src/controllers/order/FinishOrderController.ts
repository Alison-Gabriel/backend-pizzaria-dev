import type { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

export class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.body;

    const finishOrderService = new FinishOrderService();
    const updatedOrder = await finishOrderService.execute({ orderId });

    return res.status(200).json(updatedOrder);
  }
}
