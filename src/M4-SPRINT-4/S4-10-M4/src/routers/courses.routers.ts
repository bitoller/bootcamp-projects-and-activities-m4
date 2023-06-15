import { Router } from "express";
import {
  deleteUserInCourse,
  getCourses,
  getUsersInCourse,
  postCourse,
  postUserInCourse,
} from "../controllers/courses.controller";
import { courseCreate } from "../schemas/course.schema";
import { validateBody } from "../middlewares/validateBody.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";

export const coursesRouter: Router = Router();

coursesRouter.post(
  "",
  validateBody(courseCreate),
  verifyToken,
  validateAdmin,
  postCourse
);

coursesRouter.post(
  "/:courseId/users/:userId",
  verifyToken,
  validateAdmin,
  postUserInCourse
);

coursesRouter.get("", getCourses);

coursesRouter.get("/:id/users", verifyToken, validateAdmin, getUsersInCourse);

coursesRouter.delete(
  "/:courseId/users/:userId",
  verifyToken,
  validateAdmin,
  deleteUserInCourse
);
