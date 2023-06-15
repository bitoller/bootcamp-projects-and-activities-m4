import { z } from "zod";

export const user = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().max(120),
  admin: z.boolean().default(() => false),
});

export const userReturn = user.omit({ password: true });
export const userCreate = user.omit({ id: true });
export const userUpdate = userCreate.partial();
export const userRead = userReturn.array();
