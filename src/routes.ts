import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { validateSchema } from "./middlewares/validate-schema";
import { authUserSchema, createUserSchema } from "./schemas/user-schema";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { UserDetailsController } from "./controllers/user/user-details-controller";
import { validateAccessToken } from "./middlewares/validate-access-token";

export const router = Router();

// Users
router.get("/me", validateAccessToken, new UserDetailsController().handle);

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
