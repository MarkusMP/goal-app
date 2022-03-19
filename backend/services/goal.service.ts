import { getConnection } from "typeorm";
import { Goal } from "../entities/goal.entity";

export const goalCreate = async (text: string, id: string) => {
  const goal = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Goal)
    .values({ text, user_id: id })
    .returning("*")
    .execute();

  return goal.raw[0];
};

export const goalUpdate = async (text: string, id: string) => {
  const goal = await getConnection()
    .createQueryBuilder()
    .update(Goal)
    .set({ text })
    .where("id = :id", { id })
    .returning("*")
    .execute();

  return goal.raw[0];
};

export const findGoalById = async (id: string) => {
  const goal = await getConnection()
    .getRepository(Goal)
    .createQueryBuilder("goal")
    .where("goal.id = :id", { id })
    .getOne();

  return goal;
};

export const findGoalsByUserId = async (id: string) => {
  const goals = await getConnection()
    .getRepository(Goal)
    .createQueryBuilder("goal")
    .where("goal.user_id = :id", { id })
    .select(["goal.id", "goal.text", "goal.created_at"])
    .getMany();

  return goals;
};

export const goalDelete = async (id: string) => {
  const goal = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Goal)
    .where("id = :id", { id })
    .execute();

  return goal;
};
