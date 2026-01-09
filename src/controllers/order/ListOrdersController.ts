import type { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const draftQuery = String(req.query.draft);
    const draft = draftQuery === "true" ? true : false;

    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute({ draft });

    return res.status(200).json(orders);
  }
}
