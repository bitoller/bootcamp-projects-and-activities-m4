import { Router } from "express";
import {
  getProjectById,
  postProject,
  patchProject,
} from "../controllers/projects.controller";
import { ensureProjectIdExists } from "../middlewares/verifyProject.middleware";
import { ensureDeveloperExists } from "../middlewares/verifyDev.middleware";

export const projectsRouter: Router = Router();

projectsRouter.get("/:id", ensureProjectIdExists, getProjectById);

projectsRouter.post("", ensureDeveloperExists, postProject);

projectsRouter.patch(
  "/:id",
  ensureProjectIdExists,
  ensureDeveloperExists,
  patchProject
);
