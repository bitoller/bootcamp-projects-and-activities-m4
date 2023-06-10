import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { Conflict } from "../error";
import { TDeveloperInfosResult } from "../interfaces/developers.interfaces";

export const ensureAdditionalInfoExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = request.params;
  const queryResult: TDeveloperInfosResult = await client.query(
    `SELECT * FROM "developerInfos" WHERE "developerId" = $1;`,
    [id]
  );
  const devInfo = queryResult.rows[0];

  if (devInfo) {
    throw new Conflict("Developer infos already exists.");
  }

  return next();
};
