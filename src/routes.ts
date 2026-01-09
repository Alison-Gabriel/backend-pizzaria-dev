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
import multer from "multer";
import uploadConfig from "./config/multer";
import {
  createProductSchema,
  deactivateProductSchema,
  listProductsSchema,
} from "./schemas/productSchema";
import { ListProductsController } from "./controllers/product/ListProductsController";
import { DeactivateProductController } from "./controllers/product/DeactivateProductController";

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
router.get(
  "/products",
  validateAccessToken,
  validateSchema(listProductsSchema),
  new ListProductsController().handle
);

router.post(
  "/product",
  validateAccessToken,
  validateAdminRole,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle
);

router.patch(
  "/product",
  validateAccessToken,
  validateAdminRole,
  validateSchema(deactivateProductSchema),
  new DeactivateProductController().handle
);
