import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { z } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

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
    return response.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({ message: error.message });
  }

  console.error(error);
  return response.status(500).json({ message: "Internal Server Error." });
};
