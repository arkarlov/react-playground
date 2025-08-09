import { Request } from "express";
import { User } from "../../routes/auth";

export type RequestWithUser = Request & { user: User };
