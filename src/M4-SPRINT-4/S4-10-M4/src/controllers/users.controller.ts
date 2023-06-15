import { Request, Response } from "express";
import {
  createUser,
  readUserCourses,
  readUsers,
} from "../services/users.services";
import { UserRead, UserReturn } from "../interfaces/users.interfaces";
import { UserCourseCustomRead } from "../interfaces/userCourse.interfaces";

export const postUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user: UserReturn = await createUser(response.locals.validated);

  return response.status(201).json(user);
};

export const getUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users: UserRead = await readUsers();

  return response.status(200).json(users);
};

export const getUsersCourses = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const usersCourses: UserCourseCustomRead = await readUserCourses(
    request.params.id
  );

  return response.status(200).json(usersCourses);
};
