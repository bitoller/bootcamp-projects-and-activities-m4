import { QueryResult } from "pg";
import { z } from "zod";
import {
  userCourse,
  userCourseCreate,
  userCourseCustom,
  userCourseCustomRead,
  userCourseRead,
} from "../schemas/userCourse.schema";

export type IUserCourse = z.infer<typeof userCourse>;
export type UserCourseCreate = z.infer<typeof userCourseCreate>;
export type UserCourseRead = z.infer<typeof userCourseRead>;
export type UserCourseResult = QueryResult<IUserCourse>;

export type IUserCourseCustom = z.infer<typeof userCourseCustom>;
export type UserCourseCustomRead = z.infer<typeof userCourseCustomRead>;
export type UserCourseCustomResult = QueryResult<IUserCourseCustom>;
