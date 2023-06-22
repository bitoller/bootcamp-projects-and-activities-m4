import { NextFunction, Request, Response } from "express";
import { MovieRepo } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

export const verifyIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieId: number = +request.params.id;
  const repo: MovieRepo = AppDataSource.getRepository(Movie);
  const movie: Movie | null = await repo.findOneBy({ id: movieId });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  response.locals = { ...response.locals, movie };

  return next();
};
