import { Request, Response } from "express";
import { RealEstateReturn } from "../interfaces/realEstate.interfaces";
import { create, read } from "../services/realEstate.services";
import { RealEstate } from "../entities";

export const postRealEstate = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstate: RealEstateReturn = response.locals.validated;
  const newRealEstate: RealEstate = await create(realEstate);

  return response.status(201).json(newRealEstate);
};

export const getRealEstate = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstate: RealEstate[] = await read();

  return response.status(200).json(realEstate);
};
