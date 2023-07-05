import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const validateAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { admin } = response.locals.decoded;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
