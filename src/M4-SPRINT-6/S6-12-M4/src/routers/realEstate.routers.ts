import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createRealEstateWithCategoryId } from "../schemas/realEstate.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import {
  getRealEstate,
  postRealEstate,
} from "../controllers/realEstate.controller";
import { verifyAddress } from "../middlewares/verifyAddress.middleware";

export const realEstateRouter: Router = Router();

realEstateRouter.post(
  "",
  verifyToken,
  validateAdmin,
  validateBody(createRealEstateWithCategoryId),
  verifyAddress,
  postRealEstate
);

realEstateRouter.get("", getRealEstate);
