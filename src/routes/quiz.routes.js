import { Router } from "express";
import {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes
} from "../controllers/quiz.controllers.js";

const QuizRouter = Router();

// PUBLIC: Create quiz
QuizRouter.post("/", createQuiz);

// PUBLIC: Get all quizzes
QuizRouter.get("/", getAllQuizzes);

// PUBLIC: Read, update, delete quiz by ID
QuizRouter.get("/:quizId", getQuizById);
QuizRouter.patch("/:quizId", updateQuiz);
QuizRouter.delete("/:quizId", deleteQuiz);

export default QuizRouter;
