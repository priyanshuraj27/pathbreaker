const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const FlashcardSetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    flashcards: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
        difficulty: {
          type: String,
          enum: ['easy', 'medium', 'hard'],
          default: 'medium',
        },
      }
    ],
    category: {
      type: String,
      required: true,
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

const FlashcardSet = models.FlashcardSet || model('FlashcardSet', FlashcardSetSchema);

module.exports = FlashcardSet;
