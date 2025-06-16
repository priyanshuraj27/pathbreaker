import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import StudyMaterial from "../models/studyMaterial.models.js";

// GET all materials (with optional filters)
export const fetchStudyMaterials = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: "i" };

  const data = await StudyMaterial.find(filter).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, data, "Study materials fetched"));
});

// GET material by ID
export const fetchStudyMaterialById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const material = await StudyMaterial.findById(id);
  if (!material) return res.status(404).json({ success: false, message: "Not found" });
  res.status(200).json(new ApiResponse(200, material, "Material found"));
});

// CREATE material
export const addStudyMaterial = asyncHandler(async (req, res) => {
  const createdBy = req.user?._id || null;
  const material = await StudyMaterial.create({ ...req.body, createdBy });
  res.status(201).json(new ApiResponse(201, material, "Material created"));
});

// UPDATE material
export const editStudyMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const material = await StudyMaterial.findByIdAndUpdate(id, req.body, { new: true });
  if (!material) return res.status(404).json({ success: false, message: "Update failed" });
  res.status(200).json(new ApiResponse(200, material, "Material updated"));
});

// DELETE material
export const removeStudyMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await StudyMaterial.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ success: false, message: "Delete failed" });
  res.status(200).json(new ApiResponse(200, null, "Material deleted"));
});

// GET unique categories
export const fetchAllCategories = asyncHandler(async (req, res) => {
  const categories = await StudyMaterial.distinct("category");
  res.status(200).json(new ApiResponse(200, categories, "Categories fetched"));
});