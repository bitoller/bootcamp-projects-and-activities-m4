import { NextFunction, Request, Response } from "express";
import { MovieRepo } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

export const verifyNameExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const repo: MovieRepo = AppDataSource.getRepository(Movie);
  const name: string = request.body.name;

  if (!name) {
    return next();
  }

  const movie: boolean = await repo.exist({ where: { name } });

  if (movie) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};
