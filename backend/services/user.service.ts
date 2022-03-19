import { User } from "../entities/user.entity";
import { getConnection } from "typeorm";

export const findUserByEmail = async (email: string) => {
  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email })
    .getOne();
  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({ name, email, password })
    .returning("*")
    .execute();

  return user.raw[0];
};

export const findUserById = async (id: string) => {
  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id })
    .select(["user.id", "user.name", "user.email", "user.created_at"])
    .getOne();

  return user;
};
