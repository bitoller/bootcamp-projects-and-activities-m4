import { z } from "zod";
import { realEstateCategorySchema } from "./realEstate.schema";

export const categorySchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
export const categoryReadSchema = categorySchema.array();
export const CategoryRealEstateSchema = categorySchema.extend({
  realEstate: z.array(realEstateCategorySchema),
});
