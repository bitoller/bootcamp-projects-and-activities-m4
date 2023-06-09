import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { NotFound } from "../error";
import { TDeveloperResult } from "../interfaces/developers.interfaces";

export const ensureDeveloperIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const queryResult: TDeveloperResult = await client.query(
    `SELECT * FROM developers WHERE id = $1;`,
    [id]
  );
  const devId = queryResult.rows[0];

  if (!devId) {
    throw new NotFound("Developer not found.");
  }

  return next();
};
