import { Router } from "express";
import {
  getDeveloperById,
  postDeveloper,
  postDeveloperInfos,
  patchDeveloper,
  deleteDeveloper,
} from "../controllers/developers.controller";
import { ensureAdditionalInfoExists } from "../middlewares/verifyAdditionalInfo.middleware";
import { ensureEmailExists } from "../middlewares/verifyEmail.middleware";
import { ensureDeveloperIdExists } from "../middlewares/verifyId.middleware";
import { ensureOsExists } from "../middlewares/verifyOs.middleware";

export const developersRouter: Router = Router();

developersRouter.get("/:id", ensureDeveloperIdExists, getDeveloperById);

developersRouter.post("", ensureEmailExists, postDeveloper);

developersRouter.post(
  "/:id/infos",
  ensureAdditionalInfoExists,
  ensureDeveloperIdExists,
  ensureOsExists,
  postDeveloperInfos
);

developersRouter.patch(
  "/:id",
  ensureDeveloperIdExists,
  ensureEmailExists,
  patchDeveloper
);

developersRouter.delete("/:id", ensureDeveloperIdExists, deleteDeveloper);
