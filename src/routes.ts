import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { UserDetailsController } from "./controllers/user/UserDetailsController";
import { validateAccessToken } from "./middlewares/validateAccessToken";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { validateAdminRole } from "./middlewares/validateAdminRole";
import { createCategorySchema } from "./schemas/categorySchema";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import multer from "multer";

export const router = Router();
const upload = multer(uploadConfig);

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

router.get(
  "/category",
  validateAccessToken,
  new ListCategoriesController().handle
);

// Product
router.post(
  "/product",
  validateAccessToken,
  validateAdminRole,
  new CreateProductController().handle
);
