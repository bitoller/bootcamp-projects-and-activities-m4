import { QueryResult } from "pg";

export interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type TMovie = Omit<IMovie, "id">;
export type TMovieUpdate = Partial<TMovie>;
export type TMovieResult = QueryResult<IMovie>;
