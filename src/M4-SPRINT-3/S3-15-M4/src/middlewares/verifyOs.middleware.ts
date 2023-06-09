import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../error";

export const ensureOsExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { preferredOS } = request.body;

  if (
    preferredOS != "Windows" &&
    preferredOS != "Linux" &&
    preferredOS != "MacOS"
  ) {
    throw new BadRequest("Invalid OS option.");
  }

  return next();
};
