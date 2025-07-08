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
const getQuizProgressByAttemptId = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;

  const attempt = await QuizAttempt.findById(attemptId);
  if (!attempt) throw new ApiError(404, "Quiz attempt not found");

  const total = attempt.questionAttempts.length;
  const answered = attempt.questionAttempts.filter(q =>
    ["answered", "review-with-answer"].includes(q.status)
  ).length;

  const percentage = total ? Math.round((answered / total) * 100) : 0;

  return res.status(200).json(new ApiResponse(200, "Quiz progress fetched", {
    answered,
    total,
    percentage,
  }));
});
const getOverallUserQuizProgress = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const totalQuizzes = await Quiz.countDocuments();
  const completedAttempts = await QuizAttempt.find({ userId, isCompleted: true });

  const uniqueQuizIds = new Set(completedAttempts.map(attempt => attempt.quizId));
  const percentage = totalQuizzes ? Math.round((uniqueQuizIds.size / totalQuizzes) * 100) : 0;

  return res.status(200).json(new ApiResponse(200, "User quiz progress fetched", {
    completed: uniqueQuizIds.size,
    totalQuizzes,
    percentage,
  }));
});
const startQuizAttempt = asyncHandler(async (req, res) => {
  console.log("Starting quiz attempt");
  const { quizId } = req.params;
  const { userId } = req.body;
  console.log(quizId,"Quiz id ");

  const quiz = await Quiz.findOne({ id: quizId });
  if (!quiz) throw new ApiError(404, "Quiz not found");

  const questionAttempts = quiz.questions.map((q) => ({
    questionId: q.id,
    status: "not-visited"
  }));

  const attempt = await QuizAttempt.create({
    quizId,
    userId,
    questionAttempts
  });

  return res.status(201).json(new ApiResponse(201, "Quiz attempt started", attempt));
});
const submitQuizAttempt = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;
  const { questionAttempts, timeSpent } = req.body;

  const attempt = await QuizAttempt.findById(attemptId);
  if (!attempt) throw new ApiError(404, "Quiz attempt not found");

  // Calculate scores
  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;

  const updatedAttempts = questionAttempts.map((qa) => {
    if (qa.status === "answered" && qa.isCorrect) correct++;
    else if (qa.status === "answered") incorrect++;
    else unattempted++;

    return qa;
  });

  attempt.questionAttempts = updatedAttempts;
  attempt.correctAnswers = correct;
  attempt.incorrectAnswers = incorrect;
  attempt.unattempted = unattempted;
  attempt.timeSpent = timeSpent || 0;
  attempt.isCompleted = true;
  attempt.endTime = new Date();

  await attempt.save();

  return res.status(200).json(
    new ApiResponse(200, "Quiz submitted successfully", {
      attemptId: attempt._id,
      correct,
      incorrect,
      unattempted,
      total: updatedAttempts.length,
    })
  );
});

export {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizProgressByAttemptId,
  getOverallUserQuizProgress,
  startQuizAttempt,
  submitQuizAttempt
};
