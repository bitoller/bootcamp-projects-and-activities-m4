import { sign } from "jsonwebtoken";
import client from "../database/config";
import { AppError } from "../error";
import { SessionCreate, SessionReturn } from "../interfaces/session.interfaces";
import { IUser, UserResult } from "../interfaces/users.interfaces";
import { compare } from "bcryptjs";

export const createLogin = async (
  payload: SessionCreate
): Promise<SessionReturn> => {
  const queryResult: UserResult = await client.query(
    `SELECT * FROM users WHERE email = $1;`,
    [payload.email]
  );

  if (queryResult.rowCount == 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const user: IUser = queryResult.rows[0];
  const samePassword: boolean = await compare(payload.password, user.password);

  if (!samePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};
