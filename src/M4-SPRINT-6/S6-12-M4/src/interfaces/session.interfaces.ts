import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";

export type SessionCreate = z.infer<typeof sessionSchema>;
export type SessionReturn = {
  token: string;
};
