import { createConnection } from "typeorm";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

export const start = async () => {
  try {
    await createConnection({
      url: process.env.DATABASE_URL,
      type: "postgres",
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
    });
    console.log("Connected to Postgres");
    app.listen(PORT, () => {
      console.log(
        `Server has started on port ${PORT} and is running in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error: any) {
    console.error("Error connecting to Postgres");
    console.log(error);
  }
};

start();
