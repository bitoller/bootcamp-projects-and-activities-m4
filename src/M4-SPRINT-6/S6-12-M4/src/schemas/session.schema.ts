import { userSchema } from "./user.schema";

export const sessionSchema = userSchema.pick({ email: true, password: true });
