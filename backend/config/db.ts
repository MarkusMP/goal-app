import { getConnectionOptions, createConnection } from "typeorm";

export const connectDB = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: "default" });
};
