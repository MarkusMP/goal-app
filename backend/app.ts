import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import goalRoutes from "./routes/goal.route";
import path from "path";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoutes);
app.use("/api/goals", goalRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

export default app;
