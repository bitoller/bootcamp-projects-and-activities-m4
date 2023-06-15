import { QueryResult } from "pg";
import { z } from "zod";
import {
  user,
  userCreate,
  userRead,
  userReturn,
  userUpdate,
} from "../schemas/user.schema";

export type IUser = z.infer<typeof user>;
export type UserReturn = z.infer<typeof userReturn>;
export type UserCreate = z.infer<typeof userCreate>;
export type UserRead = z.infer<typeof userRead>;
export type UserUpdate = z.infer<typeof userUpdate>;
export type UserResult = QueryResult<IUser>;
