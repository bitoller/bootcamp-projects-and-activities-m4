import { Request, Response } from "express";
import { TMovie, TMovieResult } from "./interfaces";
import format from "pg-format";
import { client } from "./database";

export const getMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieCategory = request.query.category;
  let queryString = `SELECT * FROM movies;`;

  if (movieCategory) {
    if (movieCategory != "outra categoria") {
      queryString = `SELECT * FROM movies WHERE category LIKE '${movieCategory}';`;
    }
  }

  let queryResult: TMovieResult = await client.query(queryString);

  if (queryResult.rowCount == 0) {
    queryString = `SELECT * FROM movies;`;
    queryResult = await client.query(queryString);
  }

  return response.status(200).json(queryResult.rows);
};

export const getMoviesById = (
  request: Request,
  response: Response
): Response => {
  return response.status(200).json(response.locals.foundMovie);
};

export const postMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const payload: TMovie = request.body;

  const queryFormat: string = format(
    `INSERT INTO movies (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult = await client.query(queryFormat);

  return response.status(201).json(queryResult.rows[0]);
};

export const patchMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const queryFormat: string = format(
    `UPDATE movies SET (%I) = ROW (%L) WHERE id = $1 RETURNING *;`,
    Object.keys(request.body),
    Object.values(request.body)
  );

  const queryResult: TMovieResult = await client.query(queryFormat, [
    request.params.id,
  ]);

  return response.status(200).json(queryResult.rows[0]);
};

export const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await client.query(`DELETE FROM movies WHERE id = $1;`, [request.params.id]);
  
  return response.status(204).json();
};
