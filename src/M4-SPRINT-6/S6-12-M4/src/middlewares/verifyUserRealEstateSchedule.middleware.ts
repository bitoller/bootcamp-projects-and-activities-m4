import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Schedule } from "../entities";
import { AppError } from "../error";
import { ScheduleRepo } from "../interfaces/schedule.interfaces";

export const verifyUserRealEstateSchedule = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour } = request.body;
  const userId: number = response.locals.decoded.sub;
  const repo: ScheduleRepo = AppDataSource.getRepository(Schedule);
  const schedule: Schedule | null = await repo
    .createQueryBuilder("s")
    .where("s.user = :userId", { userId })
    .andWhere("s.date = :date", { date })
    .andWhere("s.hour = :hour", { hour })
    .getOne();

  if (schedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};
