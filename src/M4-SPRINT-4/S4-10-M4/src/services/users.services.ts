import format from "pg-format";
import {
  UserCreate,
  UserRead,
  UserResult,
  UserReturn,
} from "../interfaces/users.interfaces";
import client from "../database/config";
import { userRead, userReturn } from "../schemas/user.schema";
import { hash } from "bcryptjs";
import {
  IUserCourseCustom,
  UserCourseCustomResult,
} from "../interfaces/userCourse.interfaces";
import { AppError } from "../error";

export const createUser = async (payload: UserCreate): Promise<UserReturn> => {
  payload.password = await hash(payload.password, 10);

  const queryFormat: string = format(
    `INSERT INTO users (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: UserResult = await client.query(queryFormat);

  return userReturn.parse(queryResult.rows[0]);
};

export const readUsers = async (): Promise<UserRead> => {
  const queryResult: UserResult = await client.query(`SELECT * FROM users;`);

  return userRead.parse(queryResult.rows);
};

export const readUserCourses = async (
  payload: string
): Promise<IUserCourseCustom[]> => {
  const userCourses: UserCourseCustomResult = await client.query(
    `SELECT "userId" FROM "userCourses" WHERE "userId" = $1;`,
    [payload]
  );

  if (userCourses.rowCount > 0) {
    const queryFormat: string = format(
      `SELECT
      uc."courseId" AS "courseId",
      c.name AS "courseName", 
      c.description AS "courseDescription", 
      uc.active AS "userActiveInCourse", 
      uc."userId" AS "userId",
      u.name AS "userName"
      FROM
      "userCourses" AS uc
      LEFT JOIN
      courses AS c ON c.id = uc."courseId"
      INNER JOIN
      users AS u ON u.id = uc."userId"
      WHERE
      "userId" = $1;`
    );
    const queryResult: UserCourseCustomResult = await client.query(
      queryFormat,
      [payload]
    );

    return queryResult.rows;
  } else {
    throw new AppError("No course found", 404);
  }
};
