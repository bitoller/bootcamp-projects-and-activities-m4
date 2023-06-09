import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { handleError } from "./middlewares/handleErrors.middlewares";
import { developersRouter } from "./routers/developers.router";
import { projectsRouter } from "./routers/projects.router";

const app: Application = express();
app.use(express.json());

app.use("/developers", developersRouter);

app.use("/projects", projectsRouter);

app.use(handleError);

export default app;
