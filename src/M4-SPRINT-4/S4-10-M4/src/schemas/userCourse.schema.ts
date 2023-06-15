import { z } from "zod";

export const userCourse = z.object({
  id: z.number().positive(),
  active: z.boolean().default(() => true),
  userId: z.number(),
  courseId: z.number(),
});

export const userCourseCreate = userCourse.omit({ id: true });
export const userCourseRead = userCourse.array();

export const userCourseCustom = z.object({
  courseId: z.number().positive(),
  courseName: z.string(),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean().default(() => true),
  userId: z.number().positive(),
  userName: z.string(),
});

export const userCourseCustomRead = userCourseCustom.array();
