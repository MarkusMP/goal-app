import express from "express";
import { protect } from "../middleware/authMiddleware";
import { register, login, getUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/", protect, getUser);

export default router;
