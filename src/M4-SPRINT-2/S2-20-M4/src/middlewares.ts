import { NextFunction, Request, Response } from "express";
import { IMovie, TMovieResult } from "./interfaces";
import { client } from "./database";

export const ensureMovieIdExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const queryResult: TMovieResult = await client.query(
    `SELECT * FROM movies WHERE id = $1;`,
    [id]
  );

  const movie: IMovie = queryResult.rows[0];

  if (!movie) {
    return response.status(404).json({ error: "Movie not found!" });
  }

  response.locals = { ...response.locals, foundMovie: movie };

  return next();
};

export const ensureMovieNameExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name } = request.body;
  const queryResult: TMovieResult = await client.query(
    `SELECT * FROM movies WHERE name = $1;`,
    [name]
  );
  const movie: IMovie = queryResult.rows[0];
  if (movie && movie?.name == name) {
    return response.status(409).json({ error: "Movie name already exists!" });
  }
  response.locals = { ...response.locals, foundMovie: movie };

  return next();
};
