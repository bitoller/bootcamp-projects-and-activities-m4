import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { RealEstate } from "../entities";
import { RealEstateRepo } from "../interfaces/realEstate.interfaces";
import { AppError } from "../error";

export const verifyRealEstate = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const realEstateId: number = +request.params.id;
  const repo: RealEstateRepo = AppDataSource.getRepository(RealEstate);
  const isRealEstate = await repo.findOne({
    where: { id: realEstateId },
  });

  if (!isRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};
