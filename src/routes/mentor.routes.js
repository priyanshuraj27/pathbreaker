import { Router } from "express";
import {
  getMentors,
  getMentorById,
  getMentorsByCategory,
  getCategories
} from "../controllers/mentor.controllers.js";

const mentorRouter = Router();

mentorRouter.get("/", getMentors);
mentorRouter.get("/categories", getCategories);
mentorRouter.get("/category/:category", getMentorsByCategory);
mentorRouter.get("/:id", getMentorById);

export default mentorRouter;


