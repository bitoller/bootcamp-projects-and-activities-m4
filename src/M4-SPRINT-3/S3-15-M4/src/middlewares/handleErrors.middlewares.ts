import { NextFunction, Request, Response } from "express";
import { AppError, BadRequest, Conflict, NoContent, NotFound } from "../error";

export const handleError = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof BadRequest) {
    return response.status(400).json({ message: error.message });
  }

  if (error instanceof NotFound) {
    return response.status(404).json({ message: error.message });
  }

  if (error instanceof Conflict) {
    return response.status(409).json({ message: error.message });
  }

  if (error instanceof NoContent) {
    return response.status(204).json({ message: error.message });
  }

  console.error(error);
  return response.status(500).json({ message: "Internal Server Error." });
};
