import type { Request, Response } from "express";
import { UserDetailsService } from "../../services/user/user-details-service";

export class UserDetailsController {
  async handle(req: Request, res: Response) {
    const userId = req.authUserId;

    const userDetailsService = new UserDetailsService();
    const user = await userDetailsService.execute({ userId });

    return res.json({ user });
  }
}
