import { Request, Response } from "express";
import { SessionReturn } from "../interfaces/session.interfaces";
import { createLogin } from "../services/session.services";

export const postLogin = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { validated } = response.locals;
  const token: SessionReturn = await createLogin(validated);

  return response.status(200).json(token);
};
