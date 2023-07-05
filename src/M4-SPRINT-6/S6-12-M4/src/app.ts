import "express-async-errors";
import express, { Application } from "express";
import { usersRouter } from "./routers/users.routers";
import { schedulesRouter } from "./routers/schedules.routers";
import { realEstateRouter } from "./routers/realEstate.routers";
import { sessionRouter } from "./routers/session.routers";
import { categoriesRouter } from "./routers/categories.routers";
import { handleError } from "./middlewares/handleErrors.middleware";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRouter);

app.use("/login", sessionRouter);

app.use("/categories", categoriesRouter);

app.use("/realEstate", realEstateRouter);

app.use("/schedules", schedulesRouter);

app.use(handleError);

export default app;
