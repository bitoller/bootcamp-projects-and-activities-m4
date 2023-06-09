import { Request, Response } from "express";
import {
  createProject,
  readProjectById,
  updateProject,
} from "../services/projects.services";

export const getProjectById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const project = await readProjectById(request.params.id);
  return response.status(200).json(project);
};

export const postProject = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const project = await createProject(request.body);
  return response.status(201).json(project);
};

export const patchProject = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const project = await updateProject(request.body, request.params.id);
  return response.status(200).json(project);
};
