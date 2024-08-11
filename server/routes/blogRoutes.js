import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogController,
  getBlogByIdController,
  getUserBlogsController,
  updateBlogController,
} from "../controllers/blogController.js";

// *********** router object ************
export const blogRoutes = express.Router();

// create blog || POST
blogRoutes.post("/create-blog", createBlogController);

// get all blogs || GET
blogRoutes.get("/all-blogs", getAllBlogController);

// get user blogs list || GET
blogRoutes.get("/user-blogs/:id", getUserBlogsController);

// get single blog || GET
blogRoutes.get("/get-blog/:id", getBlogByIdController);

// update single blog || PUT
blogRoutes.put("/update-blog", updateBlogController);

// delete single blog || DELETE
blogRoutes.delete("/delete-blog/:id", deleteBlogController);
