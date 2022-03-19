import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import goalRoutes from "./routes/goal.route";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoutes);
app.use("/api/goals", goalRoutes);

export default app;
