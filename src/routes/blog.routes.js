import { Router } from "express";
import {
  fetchBlogs,
  fetchBlogByIdOrSlug,
  createNewBlog,
  updateBlogById,
  deleteBlogById
} from "../controllers/blog.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const blogRouter = Router();

// Routes
blogRouter.get("/", fetchBlogs);
blogRouter.get("/:idOrSlug", fetchBlogByIdOrSlug);
blogRouter.post("/", verifyJWT, createNewBlog);
blogRouter.put("/:idOrSlug", verifyJWT, updateBlogById);
blogRouter.delete("/:idOrSlug", verifyJWT, deleteBlogById);

export default blogRouter;
