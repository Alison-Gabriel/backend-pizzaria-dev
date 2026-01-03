import type { Request, Response } from "express";
import { AuthUserService } from "../../services/user/auth-user-service";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();
    const authUser = await authUserService.execute({ email, password });

    return res.json(authUser);
  }
}
