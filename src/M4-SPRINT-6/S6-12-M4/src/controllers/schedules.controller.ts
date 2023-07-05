import { Request, Response } from "express";
import { RealEstate } from "../entities";
import { create, read } from "../services/schedules.services";
import { TSchedule } from "../interfaces/schedule.interfaces";

export const postSchedule = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const schedule: TSchedule = request.body;
  const userId: number = +response.locals.decoded.sub;
  const newSchedule: object = await create(schedule, userId);

  return response.status(201).json(newSchedule);
};

export const getSchedules = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = +response.locals.decoded.sub;
  const realEstate: RealEstate = await read(id);

  return response.status(200).json(realEstate);
};
