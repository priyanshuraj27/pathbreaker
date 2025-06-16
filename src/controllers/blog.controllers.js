import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Blog from "../models/blog.models.js";

// GET all blogs with query support
export const fetchBlogs = asyncHandler(async (req, res) => {
  const { query, tag, category, published, limit = 10, page = 1 } = req.query;
  const filter = {};

  if (query) filter.title = { $regex: query, $options: "i" };
  if (tag) filter.tags = tag;
  if (category) filter.category = category;
  if (published !== undefined) filter.published = published === "true";

  const blogs = await Blog.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, "Blogs fetched", blogs));
});

// GET blog by ID or slug
export const fetchBlogByIdOrSlug = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  let blog;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findById(idOrSlug);
  }
  if (!blog) {
    blog = await Blog.findOne({ slug: idOrSlug });
  }
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(200, "Blog fetched", blog));
});

// CREATE blog
export const createNewBlog = asyncHandler(async (req, res) => {
  let { title, slug, authorId, ...rest } = req.body;
  if (!slug && title) {
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  if (!authorId) authorId = "admin";
  const blog = await Blog.create({ title, slug, authorId, ...rest });
  res.status(201).json(new ApiResponse(201, "Blog created", blog));
});

// UPDATE blog
export const updateBlogById = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  let blog;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findByIdAndUpdate(idOrSlug, req.body, { new: true });
  }
  if (!blog) {
    blog = await Blog.findOneAndUpdate({ slug: idOrSlug }, req.body, { new: true });
  }
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(200, "Blog updated", blog));
});

// DELETE blog
export const deleteBlogById = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  let blog;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findByIdAndDelete(idOrSlug);
  }
  if (!blog) {
    blog = await Blog.findOneAndDelete({ slug: idOrSlug });
  }
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(200, "Blog deleted", null));
});

// PATCH blog status (publish/unpublish)
export const patchBlogStatus = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const { published } = req.body;
  let blog;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findByIdAndUpdate(idOrSlug, { published }, { new: true });
  }
  if (!blog) {
    blog = await Blog.findOneAndUpdate({ slug: idOrSlug }, { published }, { new: true });
  }
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(200, "Blog status updated", blog));
});