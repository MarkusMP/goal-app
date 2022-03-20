import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "utils/definitionFile";
import { findUserById } from "../services/user.service";

interface JwtPayload {
  id: string;
}

const protect = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      req.user = await findUserById(decoded.id);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      res.json({ message: "Not authorized" });
      return;
    }
  }

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }
};

export { protect };
