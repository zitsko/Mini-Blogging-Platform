const Blog = require('../models/blog.js');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, text, image, author } = req.body;

  try {
    const newBlog = await Blog.create({
      title,
      text,
      image,
      author,
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get blogs by user ID
const getUserBlogs = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userBlogs = await Blog.find({ author: userId });
    res.json(userBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Edit a blog by ID
const editBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const { title, text, image } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, text, image },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;

  try {
    await Blog.findByIdAndDelete(blogId);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getUserBlogs,
  editBlog,
  deleteBlog,
};
