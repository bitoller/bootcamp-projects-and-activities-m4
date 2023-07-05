import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const verifyWorkDay = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { date } = request.body;
  const newDate: Date = new Date(date);
  const workDay: number = newDate.getDay();

  if (workDay == 0 || workDay == 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  return next();
};
