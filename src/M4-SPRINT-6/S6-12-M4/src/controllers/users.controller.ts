import { Request, Response } from "express";
import {
  UserRead,
  UserReturn,
  UserUpdate,
} from "../interfaces/user.interfaces";
import { create, destroy, read, update } from "../services/users.services";

export const postUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user: UserReturn = await create(request.body);

  return response.status(201).json(user);
};

export const getUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users: UserRead = await read();

  return response.status(200).json(users);
};

export const patchUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const payload: UserUpdate = response.locals.validated;
  const foundUser: number = +request.params.id;
  const user: UserReturn = await update(foundUser, payload);

  return response.status(200).json(user);
};

export const deleteUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await destroy(response.locals.user);

  return response.status(204).json();
};
