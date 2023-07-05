import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import {
  getCategories,
  getRealEstateFromCategory,
  postCategory,
} from "../controllers/categories.controller";
import { verifyCategoryName } from "../middlewares/verifyCategoryName.middleware";
import { verifyCategoryId } from "../middlewares/verifyCategoryId.middleware";

export const categoriesRouter: Router = Router();

categoriesRouter.post(
  "",
  verifyCategoryName,
  verifyToken,
  validateAdmin,
  validateBody(categoryCreateSchema),
  postCategory
);

categoriesRouter.get("", getCategories);

categoriesRouter.get(
  "/:id/realEstate",
  verifyCategoryId,
  getRealEstateFromCategory
);
