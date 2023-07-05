import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const verifyId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(request.params.id);
  const user: User | null = await AppDataSource.getRepository(User).findOneBy({
    id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  response.locals = { ...response.locals, user };

  return next();
};
