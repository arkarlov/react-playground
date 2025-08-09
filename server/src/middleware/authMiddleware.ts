import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { User } from "../routes/auth";
import { RequestWithUser } from "../types/express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;

    (req as RequestWithUser).user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized Access" });
  }
}
