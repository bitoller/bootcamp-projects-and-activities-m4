import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { z } from "zod";

export const handleError = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response.status(error.status).json({ message: error.message });
  }

  if (error instanceof z.ZodError) {
    return response.status(400).json(error.flatten().fieldErrors);
  }

  console.error(error);
  return response.status(500).json({ message: "Internal Server Error." });
};
