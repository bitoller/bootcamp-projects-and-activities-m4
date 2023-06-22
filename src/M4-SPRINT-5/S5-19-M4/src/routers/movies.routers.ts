import { Router } from "express";
import {
  deleteMovie,
  getMovies,
  patchMovie,
  postMovie,
} from "../controllers/movies.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movies.schema";
import { verifyIdExists } from "../middlewares/verifyId.middleware";
import { verifyNameExists } from "../middlewares/verifyName.middleware";
import { pagination } from "../middlewares/pagination.middleware";

export const moviesRouter: Router = Router();

moviesRouter.post(
  "",
  validateBody(movieCreateSchema),
  verifyNameExists,
  postMovie
);

moviesRouter.get("", pagination, getMovies);

moviesRouter.patch(
  "/:id",
  validateBody(movieUpdateSchema),
  verifyIdExists,
  verifyNameExists,
  patchMovie
);

moviesRouter.delete("/:id", verifyIdExists, deleteMovie);
