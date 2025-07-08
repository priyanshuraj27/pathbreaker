import { Router } from "express";
import {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizProgressByAttemptId,
  getOverallUserQuizProgress,
  startQuizAttempt,
  submitQuizAttempt,
} from "../controllers/quiz.controllers.js";
// console.log("Quiz routes loaded");
const QuizRouter = Router();
QuizRouter.patch("/attempt/:attemptId/submit", submitQuizAttempt);
QuizRouter.get("/progress/attempt/:attemptId", getQuizProgressByAttemptId);
QuizRouter.get("/progress/:userId", getOverallUserQuizProgress);
QuizRouter.post("/attempt/:quizId/start", startQuizAttempt);
// PUBLIC: Create quiz
QuizRouter.post("/", createQuiz);

// PUBLIC: Get all quizzes
QuizRouter.get("/", getAllQuizzes);

// PUBLIC: Read, update, delete quiz by ID
QuizRouter.get("/:quizId", getQuizById);
QuizRouter.patch("/:quizId", updateQuiz);
QuizRouter.delete("/:quizId", deleteQuiz);


export default QuizRouter;
