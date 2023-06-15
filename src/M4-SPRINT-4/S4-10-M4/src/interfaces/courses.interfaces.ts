import { QueryResult } from "pg";
import { z } from "zod";
import { course, courseCreate, courseRead } from "../schemas/course.schema";

export type ICourse = z.infer<typeof course>;

export type CourseCreate = z.infer<typeof courseCreate>;
export type CourseRead = z.infer<typeof courseRead>;
export type CourseResult = QueryResult<ICourse>;
