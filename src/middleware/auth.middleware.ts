import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/app.errors";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("unauthorized", 401);

    const jwtSecret = process.env.
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const payload = decoded as JwtPayload;

    req.user = { id: payload.id, role: payload.role };

    next();
  } catch (error) {
    next(error);
  }
};
