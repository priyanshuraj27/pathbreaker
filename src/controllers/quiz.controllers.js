import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Quiz, QuizAttempt } from "../models/quiz.models.js";
import mongoose from "mongoose";

// CREATE Quiz
const createQuiz = asyncHandler(async (req, res) => {
  const { id, title, date, duration, questionsCount, syllabus, status, questions } = req.body;

  if (!id || !title || !date || !duration || !questionsCount || !syllabus || !questions) {
    throw new ApiError(400, "Missing required quiz fields");
  }

  const existingQuiz = await Quiz.findOne({ id });
  if (existingQuiz) {
    throw new ApiError(409, "Quiz with this ID already exists");
  }

  const quiz = await Quiz.create({
    id,
    title,
    date,
    duration,
    questionsCount,
    syllabus,
    status,
    questions
  });

  return res.status(201).json(new ApiResponse(201, "Quiz created successfully", quiz));
});

// READ Quiz by ID
const getQuizById = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  let quiz = await Quiz.findOne({ id: quizId });
  if (!quiz && mongoose.Types.ObjectId.isValid(quizId)) {
    quiz = await Quiz.findById(quizId);
  }

  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  return res.status(200).json(new ApiResponse(200, "Quiz fetched successfully", quiz));
});

// UPDATE Quiz
const updateQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const updateData = req.body;

  const quiz = await Quiz.findOneAndUpdate({ id: quizId }, updateData, {
    new: true,
    runValidators: true
  });

  if (!quiz) {
    throw new ApiError(404, "Quiz not found or update failed");
  }

  return res.status(200).json(new ApiResponse(200, "Quiz updated successfully", quiz));
});

// DELETE Quiz
const deleteQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findOneAndDelete({ id: quizId });

  if (!quiz) {
    throw new ApiError(404, "Quiz not found or already deleted");
  }

  return res.status(200).json(new ApiResponse(200, "Quiz deleted successfully", quiz));
});

// LIST All Quizzes
const getAllQuizzes = asyncHandler(async (_req, res) => {
  const quizzes = await Quiz.find();
  return res.status(200).json(new ApiResponse(200, "All quizzes fetched", quizzes));
});

export {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes
};
