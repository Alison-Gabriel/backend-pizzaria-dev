import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { validateSchema } from "./middlewares/validate-schema";
import { createUserSchema } from "./schemas/user-schema";

export const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);
