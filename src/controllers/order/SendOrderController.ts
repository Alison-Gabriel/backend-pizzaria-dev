import type { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

export class SendOrderController {
  async handle(req: Request, res: Response) {
    const { orderId, name } = req.body;

    const sendOrderService = new SendOrderService();
    const updatedOrder = await sendOrderService.execute({ orderId, name });

    return res.status(200).json(updatedOrder);
  }
}
