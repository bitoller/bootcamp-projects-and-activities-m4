import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { Conflict } from "../error";
import { TDeveloperResult } from "../interfaces/developers.interfaces";

export const ensureEmailExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = request.body;
  const queryResult: TDeveloperResult = await client.query(
    `SELECT * FROM developers WHERE email = $1;`,
    [email]
  );
  const devEmail = queryResult.rows[0];

  if (devEmail) {
    throw new Conflict("Email already exists.");
  }

  return next();
};
