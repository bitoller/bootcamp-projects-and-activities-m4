import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { CategoryRepo } from "../interfaces/category.interfaces";

export const verifyCategoryName = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name } = request.body;
  const repo: CategoryRepo = AppDataSource.getRepository(Category);
  const category: boolean = await repo.exist({ where: { name: name } });

  if (category) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};
