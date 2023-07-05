import { Request, Response, NextFunction } from "express";
import { ScheduleRepo, TSchedule } from "../interfaces/schedule.interfaces";
import { Schedule } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const verifySchedule = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour, realEstateId } = request.body;
  const repo: ScheduleRepo = AppDataSource.getRepository(Schedule);
  const schedule: Schedule | null = await repo
    .createQueryBuilder("s")
    .where("s.date = :date", { date })
    .andWhere("s.hour = :hour", { hour })
    .andWhere("s.realEstateId = :realEstateId", { realEstateId })
    .getOne();

  if (schedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};
