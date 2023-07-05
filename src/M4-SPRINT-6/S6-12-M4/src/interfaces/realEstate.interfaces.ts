import { z } from "zod";
import {
  createRealEstateWithCategory,
  realEstateCreateSchema,
  realEstateReadSchema,
  realEstateReturnSchema,
  realEstateSchema,
  realEstateWithoutCategoryId,
} from "../schemas/realEstate.schema";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";

export type TRealEstate = z.infer<typeof realEstateSchema>;
export type RealEstateWithCategory = z.infer<
  typeof createRealEstateWithCategory
>;
export type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;
export type RealEstateRead = z.infer<typeof realEstateReadSchema>;
export type RealEstateReturn = z.infer<typeof realEstateReturnSchema>;
export type RealEstateWithoutCategoryId = z.infer<
  typeof realEstateWithoutCategoryId
>;
export type RealEstateRepo = Repository<RealEstate>;
