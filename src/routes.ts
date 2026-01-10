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
  listProductsByCategorySchema,
  listProductsSchema,
} from "./schemas/productSchema";
import { ListProductsController } from "./controllers/product/ListProductsController";
import { DeactivateProductController } from "./controllers/product/DeactivateProductController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import {
  addOrderItemSchema,
  createOrderSchema,
  finishOrderSchema,
  listOrdersSchema,
  orderDetailsSchema,
  removeOrderItemSchema,
  sendOrderSchema,
} from "./schemas/orderSchema";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { AddOrderItemController } from "./controllers/order/AddOrderItemController";
import { RemoveOrderItemController } from "./controllers/order/RemoveOrderItemController";
import { OrderDetailsController } from "./controllers/order/OrderDetailsController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

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

router.get(
  "/category/product",
  validateAccessToken,
  validateSchema(listProductsByCategorySchema),
  new ListProductsByCategoryController().handle
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

// Order
router.post(
  "/order",
  validateAccessToken,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle
);

router.get(
  "/orders",
  validateAccessToken,
  validateSchema(listOrdersSchema),
  new ListOrdersController().handle
);

router.post(
  "/order/add",
  validateAccessToken,
  validateSchema(addOrderItemSchema),
  new AddOrderItemController().handle
);

router.delete(
  "/order/remove",
  validateAccessToken,
  validateSchema(removeOrderItemSchema),
  new RemoveOrderItemController().handle
);

router.get(
  "/order",
  validateAccessToken,
  validateSchema(orderDetailsSchema),
  new OrderDetailsController().handle
);

router.patch(
  "/order/send",
  validateAccessToken,
  validateSchema(sendOrderSchema),
  new SendOrderController().handle
);

router.patch(
  "/order/finish",
  validateAccessToken,
  validateSchema(finishOrderSchema),
  new FinishOrderController().handle
);
