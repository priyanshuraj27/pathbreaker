import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Flashcard } from "../models/flashcard.models.js"; // ensure this model is defined

// CREATE
const createFlashcard = asyncHandler(async (req, res) => {
  const { question, answer, category, difficulty } = req.body;

  if (!question || !answer || !category || !difficulty) {
    throw new ApiError(400, "All fields are required");
  }

  const newFlashcard = await Flashcard.create({
    question,
    answer,
    category,
    difficulty,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newFlashcard, "Flashcard created successfully"));
});

// READ ALL (with optional filters)
const getFlashcards = asyncHandler(async (req, res) => {
  const { category, difficulty, query } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;
  if (query) {
    filter.question = { $regex: query, $options: "i" }; // case-insensitive search
  }

  const flashcards = await Flashcard.find(filter);
  return res
    .status(200)
    .json(new ApiResponse(200, flashcards, "Flashcards fetched successfully"));
});

// READ SINGLE
const getFlashcardById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const flashcard = await Flashcard.findById(id);
  if (!flashcard) {
    throw new ApiError(404, "Flashcard not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, flashcard, "Flashcard fetched successfully"));
});

// UPDATE
const updateFlashcard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const flashcard = await Flashcard.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!flashcard) {
    throw new ApiError(404, "Flashcard not found or update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, flashcard, "Flashcard updated successfully"));
});

// DELETE
const deleteFlashcard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const flashcard = await Flashcard.findByIdAndDelete(id);
  if (!flashcard) {
    throw new ApiError(404, "Flashcard not found or already deleted");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, flashcard, "Flashcard deleted successfully"));
});

export {
  createFlashcard,
  getFlashcards,
  getFlashcardById,
  updateFlashcard,
  deleteFlashcard,
};
