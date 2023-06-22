import { Request, Response } from "express";
import { Movie } from "../entities";
import { create, destroy, read, update } from "../services/movies.services";
import { MovieUpdate } from "../interfaces/movies.interfaces";
import { Pagination } from "../interfaces/pagination.interfaces";

export const postMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movie: Movie = await create(request.body);

  return response.status(201).json(movie);
};

export const getMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const pagination: Pagination = await read(response.locals.pagination);

  return response.status(200).json(pagination);
};

export const patchMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const payload: MovieUpdate = request.body;
  const foundMovie: Movie = response.locals.movie;
  const movie: Movie = await update(foundMovie, payload);

  return response.status(200).json(movie);
};

export const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await destroy(response.locals.movie);

  return response.status(204).json();
};
