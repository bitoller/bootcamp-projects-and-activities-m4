import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

export const verifyBusinessHours = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { hour } = request.body;
  const formattedHour: string = hour.split(":");
  const newHour: number = parseInt(formattedHour);
  const date: Date = new Date();
  date.setHours(newHour);

  if (date.getHours() >= 18 || date.getHours() <= 8) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  return next();
};
