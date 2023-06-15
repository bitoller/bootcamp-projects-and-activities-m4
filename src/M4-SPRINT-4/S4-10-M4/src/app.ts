import "express-async-errors";
import "dotenv/config";
import express, { Application, json } from "express";
import { usersRouter } from "./routers/users.router";
import { coursesRouter } from "./routers/courses.routers";
import { handleError } from "./middlewares/handleErrors.middleware";
import { sessionRouter } from "./routers/session.router";

const app: Application = express();
app.use(json());

app.use("/users", usersRouter);

app.use("/courses", coursesRouter);

app.use("/login", sessionRouter);

app.use(handleError);

export default app;
