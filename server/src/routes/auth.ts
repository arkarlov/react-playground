import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const FAKE_USER = {
  id: 1,
  email: "test@example.com",
  password: "123456", // в реальном проекте — хэш
};

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    const token = jwt.sign(
      { id: FAKE_USER.id, email: FAKE_USER.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ accessToken: token });
  } else {
    res.status(401).json({ message: "Неверный логин или пароль" });
  }
});

export default router;
