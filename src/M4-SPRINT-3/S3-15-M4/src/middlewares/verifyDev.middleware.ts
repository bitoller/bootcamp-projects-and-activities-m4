import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { NotFound } from "../error";
import { TProjectResult } from "../interfaces/projects.interfaces";

export const ensureDeveloperExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { developerId } = request.body;
  const queryResult: TProjectResult = await client.query(
    `SELECT * FROM developers WHERE id = $1;`,
    [developerId]
  );
  const dev = queryResult.rows[0];

  if (!dev) {
    throw new NotFound("Developer not found.");
  }

  return next();
};
