import express from "express";
import {Category} from "../models/Category.js";
import {Quiz} from "../models/Quiz.js";
import {QuizAttempt} from "../models/QuizAttempt.js";
import mongoose from "mongoose";
import {requireAuth} from "../middleware/auth.js";
import {QuizSession} from "../models/QuizSession.js";

const router = express.Router()

/* =========================
          카테고리
========================= */

// 등록
router.post("/category", async (req, res) => {
  try {
    const {name, description} = req.body
    const exists = await Category.findOne({name})
    if (exists) return res.status(409).json({error: "Category already exists"})

    const category = await Category.create({name, description})
    res.status(201).json(category)
  } catch (e) {
    res.status(500).json({error: "Server error"})
  }
})

// 조회
router.get("/categories", async (req, res) => {
  try {
    // 모든 카테고리 조회
    const categories = await Category.find()

    // 각 카테고리별 퀴즈 개수 조회
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const quizCount = await Quiz.countDocuments({category: cat._id})
        return {
          _id: cat._id,
          name: cat.name,
          description: cat.description,
          quizCount,
        }
      })
    )
    if (!categories) return res.status(404).json({message: "Not found"});
    res.json(categoriesWithCount)
  } catch (e) {
    console.error(e)
    res.status(500).json({error: "Server error"})
  }
})

/* =========================
          퀴즈
========================= */

// 퀴즈 생성
router.post("/quiz", async (req, res) => {
  try {
    const {category, type, context, answer, options, maxScore} = req.body

    const quiz = await Quiz.create({
      category,
      type,
      context,
      answer: type === "subjective" ? answer : undefined,
      options: type === "multiple" ? options : [],
      maxScore: maxScore || 10,
    })

    res.status(201).json(quiz)
  } catch (e) {
    console.log(e)
    res.status(500).json({error: "Server error"})
  }
})

// 퀴즈 시작
router.post("/quiz/session/start", requireAuth, async (req, res) => {
  try {
    const {categoryId} = req.body;
    const {sub: userId} = req.user;

    const quizzes = await Quiz.aggregate([
      {$match: {category: new mongoose.Types.ObjectId(categoryId)}},
      {$sample: {size: 3}}
    ]);

    const session = await QuizSession.create({
      user: userId,
      category: categoryId,
      quizIds: quizzes.map(q => q._id)
    });

    res.status(201).json(session);
  } catch (e) {
    console.log(e)
    res.status(500).json({error: "Server error"})
  }
});

// 퀴즈 세션 가져오기
router.get("/quiz/session/:sessionId", requireAuth, async (req, res) => {
  try {
    const {sessionId} = req.params;
    const {sub: userId} = req.user;

    const session = await QuizSession.findOne({_id: sessionId, user: userId})
    .populate("quizIds"); // quizIds가 Quiz ObjectId 배열이라 populate해서 문제 정보 가져오기

    if (!session) return res.status(404).json({error: "Session not found"});

    res.json({
      _id: session._id,
      category: session.category,
      quizzes: session.quizIds,
      createdAt: session.createdAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Server error"});
  }
});

// 다음 문제
router.get("/quiz/session/:sessionId/next", requireAuth, async (req, res) => {
  const {sessionId} = req.params;
  const session = await QuizSession.findById(sessionId).populate("quizIds");

  if (!session || session.finished) return res.json(null);

  const quiz = session.quizIds[session.currentIndex];
  res.json(quiz);
});

// 퀴즈 제출
router.post("/quiz/session/:sessionId/submit", requireAuth, async (req, res) => {
  const {sessionId} = req.params;
  const {answer, timeTaken} = req.body;
  const {sub: userId} = req.user;

  const session = await QuizSession.findById(sessionId).populate("quizIds");
  if (!session || session.finished) return res.status(400).json({error: "Invalid session"});

  const quiz = session.quizIds[session.currentIndex];
  let isCorrect = false;

  if (quiz.type === "subjective") {
    isCorrect = answer.trim().toLowerCase() === quiz.answer.trim().toLowerCase();
  } else if (quiz.type === "multiple") {
    const correctIds = quiz.options
    .filter(o => o.isCorrect)
    .map(o => o._id.toString());

    const answerIds = answer.map(a => a.toString());

    isCorrect =
      correctIds.length === answerIds.length &&
      correctIds.every((id) => answerIds.includes(id));
  }
  const score = isCorrect ? quiz.maxScore : 0;
  session.attempts.push({
    quiz: quiz._id,
    isCorrect,
    score,
    timeTaken,
  });
  session.currentIndex += 1;
  if (session.currentIndex >= session.quizIds.length) session.finished = true;
  await session.save();

  await QuizAttempt.create({
    user: userId,
    quiz: quiz._id,
    isCorrect,
    score,
    timeTaken,
    session: sessionId,
  });


  res.json({quiz, isCorrect, score, finished: session.finished});
});

// 퀴즈 결과 가져오기
router.get("/quiz/session/:sessionId/result", requireAuth, async (req, res) => {
  const {sessionId} = req.params;
  const session = await QuizSession.findById(sessionId).populate("quizIds");

  if (!session || !session.finished) return res.status(400).json({error: "Session not finished"});

  const totalScore = session.attempts.reduce((sum, a) => sum + a.score, 0);
  const correct = session.attempts.filter(a => a.isCorrect).length;
  const lastAttempt = session.attempts[session.attempts.length - 1];
  const totalTime = lastAttempt ? lastAttempt.timeTaken : 0;

  res.json({totalScore, correct, totalTime, attempts: session.attempts});
});

/* =========================
          유저 통계
========================= */
// 전체 통계
router.get("/user/stats", requireAuth, async (req, res) => {
  try {
    const userId = req.user.sub
    if (!userId) return res.status(401).json({error: "Unauthorized"})

    const attempts = await QuizAttempt.find({user: userId})
    const totalAttempts = attempts.length
    const correct = attempts.filter(a => a.isCorrect).length
    const totalScore = attempts.reduce((sum, a) => sum + a.score, 0)
    const avgCorrectRate = totalAttempts > 0 ? (correct / totalAttempts) * 100 : 0

    const completedSessions = await QuizSession.countDocuments({
      user: userId,
      finished: true,
    })

    res.json({
      totalAttempts,
      correct,
      totalScore,
      avgCorrectRate,
      completedSessions,
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({error: "Server error"})
  }
})

// 최근 퀴즈 기록
router.get("/user/history", requireAuth, async (req, res) => {
  try {
    const userId = req.user.sub
    if (!userId) return res.status(401).json({error: "Unauthorized"})
    const sessions = await QuizSession.find({user: userId, finished: true})
    .populate("category")
    .sort({createdAt: -1})
    .limit(10)

    const history = sessions.map((s) => {
      const correct = s.attempts.filter((a) => a.isCorrect).length
      const total = s.quizIds.length
      const scoreRate = total > 0 ? Math.round((correct / total) * 100) : 0

      return {
        id: s._id,
        category: s.category.name,
        date: s.createdAt,
        correct: correct,
        total: total,
        rate: scoreRate,
      }
    })

    res.json(history)
  } catch (e) {
    console.error(e)
    res.status(500).json({error: "Server error"})
  }
})

// 카테고리 별 통계
router.get("/user/category-stats", requireAuth, async (req, res) => {
  try {
    const userId = req.user.sub
    if (!userId) return res.status(401).json({error: "Unauthorized"})

    const sessions = await QuizSession.find({user: userId, finished: true}).populate("category")

    const statsMap = new Map()

    sessions.forEach((s) => {
      const categoryId = s.category?._id?.toString()
      if (!categoryId) return

      if (!statsMap.has(categoryId)) {
        statsMap.set(categoryId, {
          category: s.category.name,
          completed: 0,
          totalCorrect: 0,
          totalQuestions: 0,
          totalScore: 0,
        })
      }

      const stat = statsMap.get(categoryId)
      stat.completed += 1
      const correct = s.attempts.filter((a) => a.isCorrect).length
      const total = s.quizIds.length
      const totalScore = s.attempts.reduce((acc, a) => acc + (a.score || 0) , 0)
      stat.totalCorrect += correct
      stat.totalQuestions += total
      stat.totalScore += totalScore
    })

    const result = Array.from(statsMap.values()).map((s) => {
      const rate = s.totalQuestions > 0 ? Math.round((s.totalCorrect / s.totalQuestions) * 100) : 0

      return {
        category: s.category,
        completed: s.completed,
        correctRate: rate,
        total: s.totalQuestions,
        totalScore: s.totalScore
      }
    })
    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({error: "Server error"})
  }
})

export default router