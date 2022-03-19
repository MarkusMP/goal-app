import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "utils/definitionFile";
import {
  goalCreate,
  goalUpdate,
  findGoalById,
  findGoalsByUserId,
  goalDelete,
} from "../services/goal.service";

// @route   POST api/goals
// @desc    Create new goal
// @access  Private
const createGoal = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    res.json({ message: "Text field is required" });
    return;
  }

  const goal = await goalCreate(text, req.user!.id);

  if (goal) {
    res.status(200).json({
      id: goal.id,
      text: goal.text,
      created_at: goal.created_at,
    });
  } else {
    res.status(400);
    res.json({ message: "Goal could not be created" });
    return;
  }
};

// @route   PUT api/goals/:id
// @desc    Update goal
// @access  Private
const updateGoal = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { text } = req.body;
  const { id } = req.params;

  if (!text) {
    res.status(400);
    res.json({ message: "Text field is required" });
    return;
  }

  const goal = await findGoalById(id);

  if (!goal) {
    res.status(404);
    res.json({ message: "Goal not found" });
    return;
  }

  if (!req.user) {
    res.status(401);
    res.json({ message: "User not found" });
    return;
  }

  if (goal.user_id !== req.user.id) {
    console.log(goal.user_id, req.user.id);
    res.status(401);
    res.json({ message: "User not authorized" });
    return;
  }
  const goalUpdated = await goalUpdate(text, id);

  if (goalUpdated) {
    res.status(200).json({
      id: goalUpdated.id,
      text: goalUpdated.text,
      created_at: goalUpdated.created_at,
    });
  } else {
    res.status(400);
    res.json({ message: "Goal could not be updated" });
    return;
  }
};

// @route   GET api/goals
// @desc    Find all goals by user
// @access  Private
const findGoalsByUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const goals = await findGoalsByUserId(req.user!.id);

  if (goals) {
    res.status(200).json(goals);
  } else {
    res.status(400);
    res.json({ message: "Goals could not be found" });
    return;
  }
};

// @route   DELETE api/goals/:id
// @desc    Delete goal
// @access  Private
const deleteGoal = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id } = req.params;

  const goal = await findGoalById(id);

  if (!goal) {
    res.status(404);
    res.json({ message: "Goal not found" });
    return;
  }

  if (!req.user) {
    res.status(401);
    res.json({ message: "User not found" });
    return;
  }

  if (goal.user_id !== req.user.id) {
    console.log(goal.user_id, req.user.id);
    res.status(401);
    res.json({ message: "User not authorized" });
    return;
  }
  await goalDelete(id);

  res.status(200).json({
    message: "Goal deleted",
  });
};

export { createGoal, updateGoal, findGoalsByUser, deleteGoal };
