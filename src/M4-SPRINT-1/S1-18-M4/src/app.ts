import express, { Application } from "express";
import {
  postProduct,
  getProducts,
  getProductsById,
  patchProduct,
  deleteProduct,
} from "./logics";
import {
  ensureProductIdExistsMiddleware,
  ensureProductNameExistsMiddleware,
  ensureProductNameExistsPatchMiddleware,
} from "./middlewares";

const app: Application = express();
app.use(express.json());

app.get("/products", getProducts);

app.get("/products/:id", ensureProductIdExistsMiddleware, getProductsById);

app.post("/products", ensureProductNameExistsMiddleware, postProduct);

app.patch(
  "/products/:id",
  ensureProductIdExistsMiddleware,
  ensureProductNameExistsPatchMiddleware,
  patchProduct
);

app.delete("/products/:id", ensureProductIdExistsMiddleware, deleteProduct);

const PORT: number = 3000;
const serverMsg: string = `Server running on http://localhost:${PORT}`;

app.listen(PORT, () => console.log(serverMsg));
