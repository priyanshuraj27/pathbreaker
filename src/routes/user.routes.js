import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const UserRouter = Router();

// PUBLIC: Create user
UserRouter.post("/", createUser);

// PROTECTED: Read, update, delete (require auth)
UserRouter.use(verifyJWT);

UserRouter.get("/:userId", getUserById);
UserRouter.patch("/:userId", updateUser);
UserRouter.delete("/:userId", deleteUser);

export default UserRouter;
