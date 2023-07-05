import { compare } from "bcryptjs";
import { User } from "../entities";
import { sign } from "jsonwebtoken";
import { SessionCreate, SessionReturn } from "../interfaces/session.interfaces";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const createLogin = async ({
  email,
  password,
}: SessionCreate): Promise<SessionReturn> => {
  const foundUser: User | null = await AppDataSource.getRepository(
    User
  ).findOneBy({ email });

  if (!foundUser) {
    throw new AppError("Invalid credentials", 401);
  }

  const samePassword: boolean = await compare(password, foundUser.password);

  if (!samePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    { admin: foundUser.admin },
    process.env.SECRET_KEY!,
    { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};
