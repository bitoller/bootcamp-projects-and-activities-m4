import { Router } from "express";
import {
  getUsers,
  getUsersCourses,
  postUser,
} from "../controllers/users.controller";
import { ensureEmailExists } from "../middlewares/verifyEmail.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreate } from "../schemas/user.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";

export const usersRouter: Router = Router();

usersRouter.post("", validateBody(userCreate), ensureEmailExists, postUser);

usersRouter.get("", verifyToken, validateAdmin, getUsers);

usersRouter.get("/:id/courses", verifyToken, validateAdmin, getUsersCourses);
