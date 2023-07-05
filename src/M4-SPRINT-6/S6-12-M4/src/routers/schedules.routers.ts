import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { scheduleSchemaResponse } from "../schemas/schedule.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import {
  getSchedules,
  postSchedule,
} from "../controllers/schedules.controller";
import { verifySchedule } from "../middlewares/verifySchedule.middleware";
import { verifyWorkDay } from "../middlewares/verifyWorkDay.middleware";
import { verifyUserRealEstateSchedule } from "../middlewares/verifyUserRealEstateSchedule.middleware";
import { verifyBusinessHours } from "../middlewares/verifyBusinessHours.middleware";
import { verifyRealEstate } from "../middlewares/verifyRealEstateId.middleware";

export const schedulesRouter: Router = Router();

schedulesRouter.post(
  "",
  verifyToken,
  validateBody(scheduleSchemaResponse),
  verifySchedule,
  verifyUserRealEstateSchedule,
  verifyWorkDay,
  verifyBusinessHours,
  postSchedule
);

schedulesRouter.get(
  "/realEstate/:id",
  verifyToken,
  validateAdmin,
  verifyRealEstate,
  getSchedules
);
