import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../api";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

function BlogCard({ blog, isAuthor, onEdit, onHoverStart, onHoverEnd }) {
  return (
    <motion.div
      key={blog._id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-4xl mx-auto hover:shadow-2xl transition-all duration-300 group"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors duration-300">
          {blog.title}
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
            {blog.content}
          </p>
        </div>
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {(blog.author?.name || "Anonymous").charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-gray-600 font-medium">
              {blog.author?.name || "Anonymous"}
            </span>
          </div>
          {isAuthor && (
            <button 
              onClick={onEdit} 
              className="inline-flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { authUser } = useAuthStore();
  const intervalRef = useRef(null);
  const isHoveredRef = useRef(false);

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get("/home/blogs");
      setBlogs(res.data);
    } catch (error) {
      toast.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [blogs, currentIndex]);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrentIndex((prev) => (prev + 1) % blogs.length);
      }
    }, 4000); // Every 4 seconds
  };

  const handleHoverStart = () => {
    isHoveredRef.current = true;
  };

  const handleHoverEnd = () => {
    isHoveredRef.current = false;
  };

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
      await fetchBlogs();
      setCurrentIndex(0);
    } catch (error) {
      toast.error("Error submitting blog");
    }
  };

  const startEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
    setShowForm(true);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-8 lg:px-16 xl:px-24 py-5">
        {/* Header */}
        <div className="text-center mb-7">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              TripHub
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 font-light">
              Share Your Journey, Inspire Others
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
        </div>

        {/* Create Blog Button */}
        {authUser && !showForm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-7"
          >
            <button
              onClick={() => setShowForm(true)}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-md"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create New Blog</span>
              </div>
            </button>
          </motion.div>
        )}

        {/* Blog Form */}
        {authUser && showForm && (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 max-w-4xl mx-auto mb-16 border border-gray-100"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter an engaging title for your blog..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Your Story</label>
                <textarea
                  name="content"
                  placeholder="Share your amazing travel experience, tips, and memories..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg resize-none"
                  rows="8"
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                >
                  {editingBlog ? "Update Blog" : "Publish Blog"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBlog(null);
                    setFormData({ title: "", content: "" });
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}

        {/* Blog Display */}
        {blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 max-w-2xl mx-auto shadow-lg">
              <div className="text-6xl mb-6">✈️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No Stories Yet</h3>
              <p className="text-lg text-gray-600">
                Be the first to share your incredible travel journey and inspire fellow adventurers!
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-12">
              <button
                onClick={prev}
                className="group w-16 h-16 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                aria-label="Previous blog"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex-1 max-w-5xl">
                <AnimatePresence mode="wait">
                  <BlogCard
                    key={blogs[currentIndex]._id}
                    blog={blogs[currentIndex]}
                    isAuthor={
                      authUser && authUser._id === blogs[currentIndex].author?._id
                    }
                    onEdit={() => startEdit(blogs[currentIndex])}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  />
                </AnimatePresence>
              </div>

              <button
                onClick={next}
                className="group w-16 h-16 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                aria-label="Next blog"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center items-center space-x-4">
              <div className="flex space-x-2">
                {blogs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-blue-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 font-medium ml-4">
                {currentIndex + 1} of {blogs.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


