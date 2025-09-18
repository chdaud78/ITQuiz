// src/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import meRoutes from "./routes/me.js";
import postRoutes from "./routes/posts.js";
import quizRoutes from "./routes/quiz.js";

const app = express();

/** 1) 프록시 환경일 경우 클라이언트 IP 인식 (rate-limit 정확도↑) */
app.set("trust proxy", 1);

/** 2) 보안 헤더 */
app.use(helmet());

/** 3) 요청 로깅 */
app.use(morgan("dev"));

/** 4) 파서들 (JSON/URL-Encoded/Cookie) */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/** 5) CORS (개발: 정확한 origin 지정 권장) */
const allowlist = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);
// 예: .env → CORS_ORIGINS=http://localhost:5173

const corsOptions = {
  origin: allowlist.length ? allowlist : false, // 비어있으면 차단
  credentials: true,
};
app.use(cors(corsOptions));

/** 6) /health는 가볍고 빠르게 응답 (rate-limit 제외) */
app.get("/health", (_req, res) => res.json({ ok: true }));

/** 7) 전역 Rate Limit (헬스체크 제외하고 적용하고 싶으면 커스텀 미들웨어로 분기) */
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
    skip: (req) => req.path === "/health",
  })
);

/** 8) 라우터 */
app.use("/auth", authRoutes);
app.use("/", meRoutes);
app.use("/posts", postRoutes);
app.use("/api", quizRoutes);

/** 9) 404 핸들러 */
app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ message: "Not Found" });
});

/** 10) 공통 에러 핸들러 */
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const payload =
    process.env.NODE_ENV === "production"
      ? { message: "Internal Server Error" }
      : { message: err.message, stack: err.stack };
  res.status(status).json(payload);
});

/** 11) 서버 시작 */
const port = Number(process.env.PORT || 4000);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("❌ Missing MONGODB_URI in environment");
  process.exit(1);
}

connectDB(mongoUri)

export default app