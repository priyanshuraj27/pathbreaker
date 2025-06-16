import { Router } from "express";
import {
  fetchStudyMaterials,
  fetchStudyMaterialById,
  addStudyMaterial,
  editStudyMaterial,
  removeStudyMaterial,
  fetchAllCategories
} from "../controllers/studyMaterial.controllers.js";

const studyRouter = Router();

studyRouter.get("/", fetchStudyMaterials);
studyRouter.get("/categories", fetchAllCategories);
studyRouter.get("/:id", fetchStudyMaterialById);
studyRouter.post("/", addStudyMaterial);
studyRouter.patch("/:id", editStudyMaterial);
studyRouter.delete("/:id", removeStudyMaterial);

export default studyRouter;
