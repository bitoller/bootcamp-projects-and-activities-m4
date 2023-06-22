import "express-async-errors";
import express, { Application } from "express";
import { moviesRouter } from "./routers/movies.routers";
import { handleError } from "./middlewares/handleErrors.middleware";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRouter);

app.use(handleError);

export default app;
