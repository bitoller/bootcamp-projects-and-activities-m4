import { Request, Response } from "express";
import {
  createDeveloper,
  createDeveloperInfos,
  destroyDeveloper,
  readDeveloper,
  updateDeveloper,
} from "../services/developers.services";

export const getDeveloperById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const developer = await readDeveloper(request.params.id);
  return response.status(200).json(developer);
};

export const postDeveloper = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const developer = await createDeveloper(request.body);
  return response.status(201).json(developer);
};

export const postDeveloperInfos = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const developerInfo = await createDeveloperInfos(
    request.body,
    request.params.id
  );
  return response.status(201).json(developerInfo);
};

export const patchDeveloper = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const developer = await updateDeveloper(request.body, request.params.id);
  return response.status(200).json(developer);
};

export const deleteDeveloper = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await destroyDeveloper(request.params.id);
  return response.status(204).json();
};
