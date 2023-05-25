import { Request, Response } from "express";
import { market } from "./database";
import {
  ICleaningProduct,
  IFoodProduct,
  ITotal,
  TCleaningProduct,
  TFoodProduct,
} from "./interfaces";

export const getProducts = (request: Request, response: Response): Response => {
  let total = market.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  let totalMarket = {
    total: total,
    marketProducts: market,
  } as ITotal;
  return response.status(200).json(totalMarket);
};

export const getProductsById = (
  request: Request,
  response: Response
): Response => {
  const productIndex = response.locals.productIndex;
  return response.status(200).json(market[productIndex]);
};

export const postProduct = (request: Request, response: Response): Response => {
  const payload: (TFoodProduct | TCleaningProduct)[] = request.body;
  let marketId = 0;
  let newProduct = {} as IFoodProduct | ICleaningProduct;

  payload.forEach((product) => {
    marketId = market.length > 0 ? market[market.length - 1].id : 0;
    let date = new Date();
    let expirationDate = new Date(date);
    expirationDate.setDate(date.getDate() + 365);

    switch (product.section) {
      case "food":
        newProduct = {
          id: marketId + 1,
          name: product.name,
          price: product.price,
          weight: product.weight,
          calories: (product as TFoodProduct).calories,
          section: product.section,
          expirationDate: expirationDate,
        };

        break;

      case "cleaning":
        newProduct = {
          id: marketId + 1,
          name: product.name,
          price: product.price,
          weight: product.weight,
          section: product.section,
          expirationDate: expirationDate,
        };

        break;

      default:
        newProduct = {
          id: marketId + 1,
          name: product.name,
          price: product.price,
          weight: product.weight,
          section: product.section,
          expirationDate: expirationDate,
        };

        break;
    }
    market.push(newProduct);
  });
  let total = market.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  let totalMarket = {
    total: total,
    marketProducts: market,
  } as ITotal;
  return response.status(201).json(totalMarket);
};

export const patchProduct = (
  request: Request,
  response: Response
): Response => {
  const productIndex = response.locals.productIndex;
  const payload: TFoodProduct | TCleaningProduct = request.body;

  market[productIndex] = { ...market[productIndex], ...payload };
  return response.status(200).json(market[productIndex]);
};

export const deleteProduct = (
  request: Request,
  response: Response
): Response => {
  const productIndex = response.locals.productIndex;
  market.splice(productIndex, 1);
  return response.status(204).json();
};
