import { z } from "zod";
import {
  categoryCreateSchema,
  categoryReadSchema,
  categorySchema,
} from "../schemas/category.schema";
import { Repository } from "typeorm";
import { Category } from "../entities";

export type TCategory = z.infer<typeof categorySchema>;
export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
export type CategoryRead = z.infer<typeof categoryReadSchema>;
export type CategoryRepo = Repository<Category>;
