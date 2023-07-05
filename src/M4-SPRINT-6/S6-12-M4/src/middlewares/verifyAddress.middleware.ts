import { NextFunction, Request, Response } from "express";
import { Address } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { AddressRepo } from "../interfaces/address.interfaces";

export const verifyAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const address: Address = response.locals.validated.address;
  const repo: AddressRepo = AppDataSource.getRepository(Address);
  const validAddress: boolean = await repo.exist({
    where: {
      street: address.street,
      zipCode: address.zipCode,
      city: address.city,
      state: address.state,
    },
  });

  if (validAddress) {
    throw new AppError("Address already exists", 409);
  }

  return next();
};
