import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { User } from "../entities";
import { UserRepo } from "../interfaces/user.interfaces";

export const verifyEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const repo: UserRepo = AppDataSource.getRepository(User);
  const email: string = request.body.email;

  if (!email) {
    return next();
  }

  const user: boolean = await repo.exist({ where: { email: email } });

  if (user) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
