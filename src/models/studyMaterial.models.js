const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const StudyMaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    thumbnailUrl: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isLocked: {
      type : Boolean,
      default : false,
    }
  },
  { timestamps: true }
);

const StudyMaterial = models.StudyMaterial || model('StudyMaterial', StudyMaterialSchema);

module.exports = StudyMaterial;
