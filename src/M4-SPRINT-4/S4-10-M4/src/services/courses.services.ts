import format from "pg-format";
import {
  CourseCreate,
  CourseRead,
  CourseResult,
  ICourse,
} from "../interfaces/courses.interfaces";
import client from "../database/config";
import { courseRead } from "../schemas/course.schema";
import { UserResult } from "../interfaces/users.interfaces";
import { AppError } from "../error";
import {
  IUserCourseCustom,
  UserCourseCustomResult,
} from "../interfaces/userCourse.interfaces";

export const createCourse = async (payload: CourseCreate): Promise<ICourse> => {
  const queryFormat: string = format(
    `INSERT INTO courses (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: CourseResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const createUserInCourse = async (
  courseId: number,
  userId: number
): Promise<void> => {
  const userQueryResult: UserResult = await client.query(
    `SELECT id FROM users WHERE id = $1;`,
    [userId]
  );
  const courseQueryResult: CourseResult = await client.query(
    `SELECT id FROM courses WHERE id = $1;`,
    [courseId]
  );

  if (userQueryResult.rowCount > 0 && courseQueryResult.rowCount > 0) {
    await client.query(
      `INSERT INTO "userCourses" ("courseId", "userId") VALUES ($1, $2)`,
      [courseId, userId]
    );
  } else {
    throw new AppError("User/course not found", 404);
  }
};

export const readCourses = async (): Promise<CourseRead> => {
  const queryResult: CourseResult = await client.query(
    `SELECT * FROM courses;`
  );

  return courseRead.parse(queryResult.rows);
};

export const readUsersInCourse = async (
  payload: number
): Promise<IUserCourseCustom[]> => {
  const queryFormat: string = format(
    `SELECT
    uc."userId" AS "userId",
    u.name AS "userName",
    uc."courseId" AS "courseId",
    c.name AS "courseName", 
    c.description AS "courseDescription", 
    uc.active AS "userActiveInCourse"
    FROM
    "userCourses" AS uc
    LEFT JOIN
    courses AS c ON c.id = uc."courseId"
    INNER JOIN
    users AS u ON u.id = uc."userId"
    WHERE
    "courseId" = $1;`
  );
  const queryResult: UserCourseCustomResult = await client.query(queryFormat, [
    payload,
  ]);

  return queryResult.rows;
};

export const destroyUserInCourse = async (
  courseId: number,
  userId: number
): Promise<void> => {
  const userQueryResult: UserResult = await client.query(
    `SELECT id FROM users WHERE id = $1;`,
    [userId]
  );
  const courseQueryResult: CourseResult = await client.query(
    `SELECT id FROM courses WHERE id = $1;`,
    [courseId]
  );

  if (userQueryResult.rowCount > 0 && courseQueryResult.rowCount > 0) {
    await client.query(
      `UPDATE "userCourses" SET active=false WHERE "courseId" = $1 AND "userId" = $2`,
      [courseId, userId]
    );
  } else {
    throw new AppError("User/course not found", 404);
  }
};
