import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword,
    updateAccountDetails,
    completeProfile,
} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// Public routes
authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/refresh-token").post(refreshAccessToken);

// Protected routes
authRouter.route("/logout").post(verifyJWT, logoutUser);
authRouter.route("/current-user").get(verifyJWT, getCurrentUser);
authRouter.route("/change-password").post(verifyJWT, changeCurrentPassword);
authRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);
authRouter.route("/complete-profile").patch(verifyJWT, completeProfile);

export default authRouter;
