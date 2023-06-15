import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { IUser, UserResult } from "../interfaces/users.interfaces";
import client from "../database/config";

export const ensureEmailExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = request.body;
  const queryResult: UserResult = await client.query(
    `SELECT * FROM users WHERE email = $1;`,
    [email]
  );
  const userEmail: IUser = queryResult.rows[0];

  if (userEmail) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};
