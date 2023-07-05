import { AppDataSource } from "../data-source";
import { RealEstate, Schedule, User } from "../entities";
import { AppError } from "../error";
import { RealEstateRepo } from "../interfaces/realEstate.interfaces";
import { ScheduleRepo, TSchedule } from "../interfaces/schedule.interfaces";
import { UserRepo } from "../interfaces/user.interfaces";

export const create = async (
  payload: TSchedule,
  userId: number
): Promise<object> => {
  const scheduleRepo: ScheduleRepo = AppDataSource.getRepository(Schedule);
  const userRepo: UserRepo = AppDataSource.getRepository(User);
  const realEstateRepo: RealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const isUser: User | null = await userRepo.findOneBy({
    id: userId,
  });

  if (!isUser) {
    throw new AppError("User not found", 404);
  }

  const isRealEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: payload.realEstateId,
  });

  if (!isRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const schedule: Schedule = scheduleRepo.create({
    ...payload,
    realEstate: isRealEstate,
    user: isUser,
  });

  await scheduleRepo.save(schedule);

  return { message: "Schedule created" };
};

export const read = async (id: number): Promise<RealEstate> => {
  const repo: RealEstateRepo = AppDataSource.getRepository(RealEstate);
  const realEstate: RealEstate | null = await repo.findOne({
    where: { id: id },
    relations: {
      address: true,
      category: true,
      schedules: { user: true },
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstate;
};
