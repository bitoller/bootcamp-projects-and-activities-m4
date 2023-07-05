import { z } from "zod";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/user.schema";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

export type TUser = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserRead = z.infer<typeof userReadSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;
export type UserUpdate = DeepPartial<typeof userUpdateSchema>;
export type UserRepo = Repository<User>;
