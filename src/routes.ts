import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { validateSchema } from "./middlewares/validate-schema";
import { authUserSchema, createUserSchema } from "./schemas/user-schema";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { UserDetailsController } from "./controllers/user/user-details-controller";
import { validateAccessToken } from "./middlewares/validate-access-token";
import { CreateCategoryController } from "./controllers/category/create-category-controller";
import { validateAdminRole } from "./middlewares/validate-admin-role";
import { createCategorySchema } from "./schemas/category-schema";

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

router.get("/me", validateAccessToken, new UserDetailsController().handle);

// Category
router.post(
  "/category",
  validateAccessToken,
  validateAdminRole,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle
);
