import { Router } from "express";
import {
  fetchStudyMaterials,
  fetchStudyMaterialById,
  addStudyMaterial,
  editStudyMaterial,
  removeStudyMaterial,
  fetchAllCategories
} from "../controllers/studyMaterial.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const studyRouter = Router();

studyRouter.get("/", fetchStudyMaterials);
studyRouter.get("/categories", fetchAllCategories);
studyRouter.get("/:id", fetchStudyMaterialById);
studyRouter.post("/", verifyJWT, addStudyMaterial);
studyRouter.patch("/:id", verifyJWT, editStudyMaterial);
studyRouter.delete("/:id", verifyJWT, removeStudyMaterial);

export default studyRouter;
