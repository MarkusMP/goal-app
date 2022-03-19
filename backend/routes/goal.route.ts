import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createGoal,
  findGoalsByUser,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller";

const router = express.Router();

router.post("/", protect, createGoal);
router.put("/:id", protect, updateGoal);
router.get("/", protect, findGoalsByUser);
router.delete("/:id", protect, deleteGoal);

export default router;
