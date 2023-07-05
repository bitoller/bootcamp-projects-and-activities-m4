import { AppDataSource } from "../data-source";
import { User } from "../entities";
import {
  UserCreate,
  UserRead,
  UserRepo,
  UserReturn,
  UserUpdate,
} from "../interfaces/user.interfaces";
import { userReadSchema, userReturnSchema } from "../schemas/user.schema";

export const create = async (payload: UserCreate): Promise<UserReturn> => {
  const user: User = AppDataSource.getRepository(User).create(payload);
  await AppDataSource.getRepository(User).save(user);

  return userReturnSchema.parse(user);
};

export const read = async (): Promise<UserRead> => {
  return userReadSchema.parse(await AppDataSource.getRepository(User).find());
};

export const update = async (
  userId: number,
  payload: UserUpdate
): Promise<UserReturn> => {
  const repo: UserRepo = AppDataSource.getRepository(User);
  const user: User | null = await repo.findOneBy({ id: userId });
  const userUpdate: User = repo.create({ ...user, ...payload });

  return userReturnSchema.parse(userUpdate);
};

export const destroy = async (user: User): Promise<void> => {
  await AppDataSource.getRepository(User).softRemove(user);
};
