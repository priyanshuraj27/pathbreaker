import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const UserRouter = Router();

// PUBLIC: Create user
UserRouter.post("/", createUser);

// PUBLIC: Read, update, delete (no auth)
UserRouter.get("/:userId", getUserById);
UserRouter.patch("/:userId", updateUser);
UserRouter.delete("/:userId", deleteUser);

export default UserRouter;
