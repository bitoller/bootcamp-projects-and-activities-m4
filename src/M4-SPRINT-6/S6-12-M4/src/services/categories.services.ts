import {
  CategoryCreate,
  CategoryRepo,
  TCategory,
} from "../interfaces/category.interfaces";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { categorySchema } from "../schemas/category.schema";

export const create = async (payload: CategoryCreate): Promise<TCategory> => {
  const repo: CategoryRepo = AppDataSource.getRepository(Category);
  const category: Category = repo.create(payload);
  await repo.save(category);

  return categorySchema.parse(category);
};

export const read = async (): Promise<Category[]> => {
  const repo: CategoryRepo = AppDataSource.getRepository(Category);
  const category: Category[] = await repo.find();

  return category;
};

export const retrieve = async (
  categoryId: number
): Promise<TCategory | null> => {
  const repo: CategoryRepo = AppDataSource.getRepository(Category);
  const category: Category | null = await repo.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true,
    },
  });

  return category;
};
