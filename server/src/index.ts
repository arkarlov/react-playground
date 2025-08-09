import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

import { authMiddleware } from "./middleware/authMiddleware";
import { RequestWithUser } from "./types/express";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data",
    user: (req as RequestWithUser).user,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
