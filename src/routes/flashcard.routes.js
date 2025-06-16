import { Router } from "express";
import {
  createFlashcard,
  getFlashcards,
  getFlashcardById,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcard.controllers.js";

const flashcardRouter = Router();

// POST /api/flashcards -> create flashcard
// GET /api/flashcards -> get all flashcards (with optional filters)
flashcardRouter.route("/")
  .post(createFlashcard)
  .get(getFlashcards);

// GET /api/flashcards/:id -> single flashcard
// PUT /api/flashcards/:id -> update
// DELETE /api/flashcards/:id -> delete
flashcardRouter.route("/:id")
  .get(getFlashcardById)
  .put(updateFlashcard)
  .delete(deleteFlashcard);

export default flashcardRouter;
