import { Request, Response } from "express";
import {
  CategoryCreate,
  CategoryRead,
  TCategory,
} from "../interfaces/category.interfaces";
import { create, read, retrieve } from "../services/categories.services";

export const postCategory = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const category: CategoryCreate = request.body;
  const newCategory: TCategory = await create(category);

  return response.status(201).json(newCategory);
};

export const getCategories = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categories: CategoryRead = await read();

  return response.status(200).json(categories);
};

export const getRealEstateFromCategory = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = +request.params.id;
  const category: TCategory | null = await retrieve(id);

  return response.status(200).json(category);
};
