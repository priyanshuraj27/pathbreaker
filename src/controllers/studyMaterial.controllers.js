import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import StudyMaterial from "../models/studyMaterial.models.js";

// GET all study materials (with optional filters)
const fetchStudyMaterials = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const user = req.user;
  const filter = {};

  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: "i" };

  let data = await StudyMaterial.find(filter).sort({ createdAt: -1 }).lean();

  // Hide locked content if user has not paid
  if (!user?.hasPaid) {
    data = data.map(mat => {
      if (mat.isLocked) {
        return {
          _id: mat._id,
          title: mat.title,
          description: mat.description,
          category: mat.category,
          isLocked: true,
          lockedMessage: "Subscribe to unlock this material.",
          thumbnailUrl: mat.thumbnailUrl,
          uploadDate: mat.uploadDate,
        };
      }
      return mat;
    });
  }

  res.status(200).json(new ApiResponse(200, "Study materials fetched", data));
});

// GET study material by ID
const fetchStudyMaterialById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const material = await StudyMaterial.findById(id);
  if (!material) {
    return res.status(404).json(new ApiResponse(404, "Not found", null, false));
  }

  // If locked and user not subscribed, block access
  if (material.isLocked && !user?.hasPaid) {
    return res.status(403).json(new ApiResponse(403, "This material is locked. Subscribe to access.", {
      title: material.title,
      description: material.description,
      category: material.category,
      isLocked: true,
      thumbnailUrl: material.thumbnailUrl,
    }));
  }

  res.status(200).json(new ApiResponse(200, "Material found", {
    ...material.toObject(),
    isLocked: false
  }));
});

// CREATE a new study material
const addStudyMaterial = asyncHandler(async (req, res) => {
  const user = req.user;

  // Optional: only allow certain roles to upload
  // if (user.role !== 'admin') return res.status(403).json(new ApiResponse(403, "Not authorized"));

  const material = await StudyMaterial.create({
    ...req.body,
    createdBy: user._id
  });

  res.status(201).json(new ApiResponse(201, "Material created", material));
});

// UPDATE a study material
const editStudyMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const material = await StudyMaterial.findByIdAndUpdate(id, req.body, { new: true });
  if (!material) {
    return res.status(404).json(new ApiResponse(404, "Update failed", null, false));
  }
  res.status(200).json(new ApiResponse(200, "Material updated", material));
});

// DELETE a study material
const removeStudyMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await StudyMaterial.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json(new ApiResponse(404, "Delete failed", null, false));
  }
  res.status(200).json(new ApiResponse(200, "Material deleted", null));
});

// GET all unique categories
const fetchAllCategories = asyncHandler(async (req, res) => {
  const categories = await StudyMaterial.distinct("category");
  res.status(200).json(new ApiResponse(200, "Categories fetched", categories));
});


export {
  fetchStudyMaterials,
  fetchStudyMaterialById,
  addStudyMaterial,
  editStudyMaterial,
  removeStudyMaterial,
  fetchAllCategories
};
