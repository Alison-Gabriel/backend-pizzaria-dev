import type { Request, Response } from "express";
import { CreateUserService } from "../../services/user/create-user-service";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();
    const createdUser = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.json(createdUser);
  }
}
