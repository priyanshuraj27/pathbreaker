const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const FlashcardSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    setTitle: {
      type: String,
    },
    setDescription: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Flashcard = models.Flashcard || model('Flashcard', FlashcardSchema);

module.exports = Flashcard;
