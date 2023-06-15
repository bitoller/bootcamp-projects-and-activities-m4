import { z } from "zod";

export const course = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string(),
});

export const courseCreate = course.omit({ id: true });
export const courseRead = course.array();
