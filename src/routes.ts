import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { validateSchema } from "./middlewares/validate-schema";
import { authUserSchema, createUserSchema } from "./schemas/user-schema";
import { AuthUserController } from "./controllers/user/auth-user-controller";

export const router = Router();

// Users
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle
);
