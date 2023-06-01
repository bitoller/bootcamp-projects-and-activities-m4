import express, { Application } from "express";
import {
  postMovie,
  getMovies,
  getMoviesById,
  patchMovie,
  deleteMovie,
} from "./logics";
import {
  ensureMovieIdExistsMiddleware,
  ensureMovieNameExistsMiddleware,
} from "./middlewares";
import { startDatabase } from "./database";

const app: Application = express();
app.use(express.json());

app.get("/movies", getMovies);

app.get("/movies/:id", ensureMovieIdExistsMiddleware, getMoviesById);

app.post("/movies", ensureMovieNameExistsMiddleware, postMovie);

app.patch(
  "/movies/:id",
  ensureMovieIdExistsMiddleware,
  ensureMovieNameExistsMiddleware,
  patchMovie
);

app.delete("/movies/:id", ensureMovieIdExistsMiddleware, deleteMovie);

const serverMsg: string = `Server running on http://localhost:${process.env.PORT}`;

app.listen(process.env.PORT, async () => {
  await startDatabase();
  console.log(serverMsg);
});
