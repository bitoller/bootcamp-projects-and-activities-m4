import { z } from "zod";

export const sessionCreate = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
