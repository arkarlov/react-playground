import { Router, Response, CookieOptions } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const router = Router();

export type User = { id: number; email: string };

const TOKEN_LIFETIME: Record<"ACCESS" | "REFRESH", SignOptions["expiresIn"]> = {
  ACCESS: "15s",
  REFRESH: "7d",
};

const FAKE_USER = {
  id: 1,
  email: "test@example.com",
  password: "test@example.com",
};

const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: false, // `true` for HTTPS
  path: "/api/auth/refresh",
};

function generateToken<T extends string | Buffer | object>(
  payload: T,
  options?: SignOptions
) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1m", ...options });
}

function sendRefreshToken(res: Response, token: string) {
  res.cookie("refreshToken", token, REFRESH_TOKEN_COOKIE_OPTIONS);
}

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    const user = { id: FAKE_USER.id, email };
    const accessToken = generateToken(user, {
      expiresIn: TOKEN_LIFETIME.ACCESS,
    });
    const refreshToken = generateToken(user, {
      expiresIn: TOKEN_LIFETIME.REFRESH,
    });
    sendRefreshToken(res, refreshToken);
    return res.json({ accessToken });
  }

  return res.status(401).json({ message: "Inavild user data" });
});

// POST /api/auth/refresh
router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;
    const user = { id: decoded.id, email: decoded.email };
    const accessToken = generateToken(user, {
      expiresIn: TOKEN_LIFETIME.ACCESS,
    });
    return res.json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", (_, res) => {
  res.clearCookie("refreshToken", REFRESH_TOKEN_COOKIE_OPTIONS);
  return res.sendStatus(204);
});

export default router;
