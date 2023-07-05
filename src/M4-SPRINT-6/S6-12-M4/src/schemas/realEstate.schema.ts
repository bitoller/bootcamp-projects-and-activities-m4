import { z } from "zod";
import { addressCreateSchema, addressSchema } from "./address.schema";
import { categorySchema } from "./category.schema";

export const realEstateSchema = z.object({
  id: z.number().positive(),
  sold: z.boolean().default(() => false),
  value: z.string().or(z.number().positive()).default(0),
  size: z.number().positive(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  address: addressCreateSchema,
  categoryId: z.number().positive(),
});

export const realEstateCreateSchema = realEstateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createRealEstateWithCategoryId = z.object({
  value: z.string().or(z.number().positive()).default(0),
  size: z.number().positive(),
  address: addressCreateSchema,
  categoryId: z.number().positive(),
});

export const realEstateReturnSchema = realEstateSchema.omit({
  id: true,
  sold: true,
  createdAt: true,
  updatedAt: true,
});

export const createRealEstateWithCategory = z.object({
  value: z.string().or(z.number().positive()).default(0),
  size: z.number().positive(),
  address: addressSchema,
  category: categorySchema,
});

export const realEstateCategorySchema = realEstateSchema.omit({
  categoryId: true,
  address: true,
});

export const realEstateReadSchema = realEstateSchema.array();

export const realEstateWithoutCategoryId = realEstateSchema
  .omit({ categoryId: true })
  .extend({ category: categorySchema });
