import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { NotFound } from "../error";

export const ensureProjectIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = request.params;
  const queryResult = await client.query(
    `SELECT * FROM projects WHERE id = $1;`,
    [id]
  );
  const project = queryResult.rows[0];

  if (!project) {
    throw new NotFound("Project not found.");
  }

  return next();
};
