import mongoose from "mongoose";
import { blogModel } from "../models/blogModel.js";
import { userModel } from "../models/userModel.js";

//  ************** create user new blog ***************
export const createBlogController = async (req, res) => {
  try {
    const { title, description, image, userId } = req.body;

    //validation
    if (!title || !description || !image || !userId) {
      return res.status(404).send({
        success: false,
        message: "please fill all fields",
      });
    }

    const exisitingUser = await userModel.findById(userId);

    //validation
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const blog = new blogModel({ title, description, image, user: userId });

    // session is created
    const session = await mongoose.startSession();
    session.startTransaction();

    await blog.save({ session });
    exisitingUser.blogs.push(blog);
    await exisitingUser.save({ session });

    await session.commitTransaction();

    //@ startTransaction()
    //----meaning that all changes made within a transaction are treated as a single unit of work.
    //----If any part of the transaction fails (e.g., due to an error), the entire transaction is rolled back,
    //    undoing any changes that were made, and leaving the database in its original state.

    return res.status(201).send({
      success: true,
      message: "blog created!",
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in create blog",
      error,
    });
  }
};

//  ************** get all blogs list ***************
export const getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "no blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      BlogsCount: blogs.length,
      blogs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while getting blogs",
      error,
    });
  }
};

//  ************** get user blogs list ***************
export const getUserBlogsController = async (req, res) => {
  try {
    const userBlogs = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlogs) {
      return res.status(404).send({
        success: false,
        message: "no blogs found with this id",
      });
    }

    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlogs,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "error in user blogs",
      error,
    });
  }
};

//  ************** get single blog ***************
export const getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: true,
        message: "blog not find",
      });
    }
    return res.status(200).send({
      success: true,
      message: "get blog succussfully",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "error while getting a blog",
    });
  }
};

//  ************** udpate a blog ***************
export const updateBlogController = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "blog udpated succussfully",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while update the blog",
      error,
    });
  }
};

//  ************** delete a blog ***************
// export const deleteBlogController = async (req, res) => {
//   try {
//     // Find the blog and populate the userId field in one query
//     const blog = await blogModel
//       .findByIdAndDelete(req.params.id)
//       .populate("user");

//     // Check if blog exists
//     if (!blog) {
//       return res.status(404).send({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     console.log("findByIdAndDelete() :: ", blog);

//     //@ populate()
//     //----used to retrieve related data from other collections and populate it within the current document you're fetching.
//     //----It eliminates the need for separate queries to join data from different collections.
//     //----here, populate() fetch the complete data of user schema in userId property

//     // Remove the blog from the user's blogs array
//     let pullData = await blog.user.blogs.pull(blog);

//     console.log("pull() :: ", pullData);

//     // Save the updated user document
//     await blog.user.save();
//     console.log("blog deleted");
//     return res.status(200).send({
//       success: true,
//       message: "Blog Deleted!",
//     });
//   } catch (error) {
//     return res.status(400).send({
//       success: false,
//       message: "Erorr WHile Deleteing BLog",
//       error,
//     });
//   }
// };

export const deleteBlogController = async (req, res) => {
  try {
    // populate() -> fetch the complete data of user schema in user property
    const blog = await blogModel.findById(req.params.id).populate("user");
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found!",
      });
    }

    // Pull() -> remove the blog from the user's blogs array
    blog.user.blogs.pull(blog._id);
    await blog.user.save();

    // Delete the blog from blogs collection
    await blogModel.findByIdAndDelete(blog._id);

    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};
