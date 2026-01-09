import type { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;

    const createOrderService = new CreateOrderService();
    const createdOrder = await createOrderService.execute({ table, name });

    return res.status(201).json(createdOrder);
  }
}
