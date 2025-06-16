import { Router } from "express";
import {
  fetchBlogs,
  fetchBlogByIdOrSlug,
  createNewBlog,
  updateBlogById,
  deleteBlogById
} from "../controllers/blog.controllers.js";

const blogRouter = Router();

// Routes
blogRouter.get("/", fetchBlogs);
blogRouter.get("/:idOrSlug", fetchBlogByIdOrSlug);
blogRouter.post("/", createNewBlog);
blogRouter.put("/:idOrSlug", updateBlogById);
blogRouter.delete("/:idOrSlug", deleteBlogById);

export default blogRouter;
