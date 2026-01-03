import type { Request, Response } from "express";
import { UserDetailsService } from "../../services/user/UserDetailsService";

export class UserDetailsController {
  async handle(req: Request, res: Response) {
    const userId = req.authUserId;

    const userDetailsService = new UserDetailsService();
    const userDetails = await userDetailsService.execute({ userId });

    return res.json(userDetails);
  }
}
