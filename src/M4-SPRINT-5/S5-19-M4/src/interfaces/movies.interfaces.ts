import { z } from "zod";
import { movieCreateSchema } from "../schemas/movies.schema";
import { Movie } from "../entities";
import { DeepPartial, Repository } from "typeorm";

export type MovieCreate = z.infer<typeof movieCreateSchema>;
export type MovieRead = Array<Movie>;
export type MovieUpdate = DeepPartial<MovieCreate>;
export type MovieRepo = Repository<Movie>;
