import { AppDataSource } from "../data-source";
import { Address, Category, RealEstate } from "../entities";
import { AppError } from "../error";
import { AddressRepo } from "../interfaces/address.interfaces";
import { CategoryRepo } from "../interfaces/category.interfaces";
import {
  RealEstateRepo,
  RealEstateReturn,
  RealEstateWithCategory,
} from "../interfaces/realEstate.interfaces";

export const create = async (
  payload: RealEstateReturn
): Promise<RealEstate> => {
  const categoryRepo: CategoryRepo = AppDataSource.getRepository(Category);
  const category: Category | null = await categoryRepo.findOne({
    where: { id: payload.categoryId },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  } else {
    payload.address.number = payload.address.number
      ? payload.address.number
      : null;

    const addressRepo: AddressRepo = AppDataSource.getRepository(Address);
    const address: Address = addressRepo.create(payload.address);
    await addressRepo.save(address);

    const newRealEstate: RealEstateWithCategory = {
      address: address,
      category: category,
      size: payload.size,
      value: +payload.value,
    };
    const realEstateRepo: RealEstateRepo =
      AppDataSource.getRepository(RealEstate);
    const realEstate: RealEstate = realEstateRepo.create(newRealEstate);
    await realEstateRepo.save(realEstate);

    return realEstate;
  }
};

export const read = async (): Promise<RealEstate[]> => {
  const repo: RealEstateRepo = AppDataSource.getRepository(RealEstate);
  const realEstate: Array<RealEstate> = await repo.find({
    relations: {
      address: true,
    },
  });

  return realEstate;
};
