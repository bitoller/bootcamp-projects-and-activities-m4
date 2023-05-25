import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { TFoodProduct, TCleaningProduct } from "./interfaces";

export const ensureProductIdExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const productIndex: number = market.findIndex(
    (product) => product.id == parseInt(id)
  );

  if (productIndex == -1) {
    return response.status(404).json({
      error: "Product not found",
    });
  }

  response.locals.productIndex = productIndex;

  return next();
};

export const ensureProductNameExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const payload: (TFoodProduct | TCleaningProduct)[] = request.body;
  let productName = undefined;

  payload.forEach((product) => {
    productName = market.find(
      (marketProduct) =>
        product.name.toLowerCase() == marketProduct.name.toLowerCase()
    );
  });

  if (productName != undefined) {
    return response.status(409).json({
      error: "Product already registered",
    });
  }
  return next();
};

export const ensureProductNameExistsPatchMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const payload: TFoodProduct | TCleaningProduct = request.body;
  let productName = undefined;

  productName = market.find(
    (marketProduct) =>
      payload.name.toLowerCase() == marketProduct.name.toLowerCase()
  );

  if (productName != undefined) {
    return response.status(409).json({
      error: "Product already registered",
    });
  }
  return next();
};
