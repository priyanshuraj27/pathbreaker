import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js";

// CREATE
const createUser = asyncHandler(async (req, res) => {
  const { email, username, firstName, lastName, photo } = req.body;

  if (!email || !username || !lastName || !photo) {
    throw new ApiError(400, "Missing required user fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({
    email,
    username,
    firstName,
    lastName,
    photo
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully"));
});

// READ
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

// UPDATE
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true
  });

  if (!user) {
    throw new ApiError(404, "User not found or update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully"));
});

// DELETE
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, "User not found or already deleted");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User deleted successfully"));
});

export {
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
