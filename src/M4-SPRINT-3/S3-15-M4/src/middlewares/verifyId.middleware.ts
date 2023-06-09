import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { NotFound } from "../error";

export const ensureDeveloperIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const queryResult = await client.query(
    `SELECT * FROM developers WHERE id = $1;`,
    [id]
  );
  const devId = queryResult.rows[0];

  if (!devId) {
    throw new NotFound("Developer not found.");
  }

  return next();
};
