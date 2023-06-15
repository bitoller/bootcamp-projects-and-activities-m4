import { Request, Response } from "express";
import {
  createCourse,
  createUserInCourse,
  destroyUserInCourse,
  readCourses,
  readUsersInCourse,
} from "../services/courses.services";
import { CourseRead, ICourse } from "../interfaces/courses.interfaces";
import { UserCourseCustomRead } from "../interfaces/userCourse.interfaces";

export const postCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const course: ICourse = await createCourse(response.locals.validated);

  return response.status(201).json(course);
};

export const postUserInCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await createUserInCourse(+request.params.courseId, +request.params.userId);
  return response.status(201).json({
    message: "User successfully vinculed to course",
  });
};

export const getCourses = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const courses: CourseRead = await readCourses();

  return response.status(200).json(courses);
};

export const getUsersInCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const usersInCourse: UserCourseCustomRead = await readUsersInCourse(
    +request.params.id
  );
  return response.status(200).json(usersInCourse);
};

export const deleteUserInCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await destroyUserInCourse(+request.params.courseId, +request.params.userId);
  return response.status(204).json();
};
