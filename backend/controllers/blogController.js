const Blog = require("../models/Blogs");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name").sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newBlog = await Blog.create({
      title,
      content,
      author: req.userId,
    });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
};
