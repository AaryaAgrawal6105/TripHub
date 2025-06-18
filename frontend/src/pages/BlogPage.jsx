import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

function BlogCard({ blog, isAuthor, onEdit }) {
  return (
    <div className="bg-gray-100 p-6 rounded shadow w-full">
      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
      <p className="text-gray-700 whitespace-pre-wrap mb-2">{blog.content}</p>
      <p className="text-sm text-gray-500">By: {blog.author?.name || "Anonymous"}</p>
      {isAuthor && (
        <button
          onClick={onEdit}
          className="text-sm text-blue-500 mt-2 hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [showForm, setShowForm] = useState(false);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const { authUser } = useAuthStore();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/home/blogs");
        setBlogs(res.data);
      } catch (error) {
        toast.error("Failed to load blogs");
      }
    };
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await axiosInstance.put(`/home/blogs/${editingBlog._id}`, formData);
        toast.success("Blog updated");
      } else {
        await axiosInstance.post("/home/blogs", formData);
        toast.success("Blog posted");
      }
      setEditingBlog(null);
      setFormData({ title: "", content: "" });
      setShowForm(false);
      const res = await axiosInstance.get("/home/blogs");
      setBlogs(res.data);
    } catch (error) {
      toast.error("Error submitting blog");
    }
  };

  const startEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
    setShowForm(true);
  };

  const nextBlog = () => {
    setCurrentBlogIndex((prev) => (prev + 1) % blogs.length);
  };

  const prevBlog = () => {
    setCurrentBlogIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">TripHub Community Blogs</h2>

      {authUser && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Blog
        </button>
      )}

      {authUser && showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full mb-2 p-2 border rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Share your experience..."
            className="w-full mb-2 p-2 border rounded"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingBlog ? "Update Blog" : "Post Blog"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingBlog(null);
                setFormData({ title: "", content: "" });
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available yet. Be the first to post!</p>
      ) : (
        <div className="relative flex items-center justify-between gap-4">
          <button
            onClick={prevBlog}
            className="text-blue-600 font-bold text-lg hover:underline"
          >
            ◀
          </button>

          <div className="flex-1">
            <BlogCard
              blog={blogs[currentBlogIndex]}
              isAuthor={authUser && authUser._id === blogs[currentBlogIndex].author?._id}
              onEdit={() => startEdit(blogs[currentBlogIndex])}
            />
          </div>

          <button
            onClick={nextBlog}
            className="text-blue-600 font-bold text-lg hover:underline"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
