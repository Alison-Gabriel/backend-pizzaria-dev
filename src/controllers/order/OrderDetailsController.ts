import type { Request, Response } from "express";
import { OrderDetailsService } from "../../services/order/OrderDetailsService";

export class OrderDetailsController {
  async handle(req: Request, res: Response) {
    const orderId = String(req.query.order_id);

    const orderDetailsService = new OrderDetailsService();
    const order = await orderDetailsService.execute({ orderId });

    return res.status(200).json(order);
  }
}
