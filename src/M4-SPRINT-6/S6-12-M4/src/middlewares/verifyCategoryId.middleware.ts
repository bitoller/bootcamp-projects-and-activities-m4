import { NextFunction, Request, Response } from "express";
import { CategoryRepo } from "../interfaces/category.interfaces";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";

export const verifyCategoryId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const repo: CategoryRepo = AppDataSource.getRepository(Category);
  const category: boolean | null = await repo.exist({
    where: {
      id: +request.params.id,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return next();
};
