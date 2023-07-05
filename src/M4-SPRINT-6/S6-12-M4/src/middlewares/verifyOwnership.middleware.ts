import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const verifyOwnership = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(request.params.id);
  const userId: number = parseInt(response.locals.decoded.sub);
  const isAdmin: boolean = response.locals.decoded.admin;

  if (isAdmin == false && id != userId) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
