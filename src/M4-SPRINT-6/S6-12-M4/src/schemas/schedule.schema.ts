import { z } from "zod";
import { realEstateWithoutCategoryId } from "./realEstate.schema";
import { userReturnSchema } from "./user.schema";

export const scheduleSchema = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().positive(),
  userId: z.number().positive(),
});

export const scheduleCreateSchema = scheduleSchema.omit({ id: true });

export const scheduleSchemaResponse = scheduleSchema.omit({
  id: true,
  userId: true,
});

export const scheduleSchemaWithoutUserId = scheduleCreateSchema.omit({
  userId: true,
});

export const scheduleSchemaWithRealEstateAndUser = scheduleSchema
  .extend({
    realEstate: realEstateWithoutCategoryId,
    user: userReturnSchema,
  })
  .omit({
    realEstateId: true,
  });
