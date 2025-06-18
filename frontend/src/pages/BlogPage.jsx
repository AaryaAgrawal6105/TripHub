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
      className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <h3 className="text-2xl font-extrabold text-blue-800 mb-3">{blog.title}</h3>
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
        {blog.content}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>✍️ {blog.author?.name || "Anonymous"}</span>
        {isAuthor && (
          <button onClick={onEdit} className="text-blue-600 hover:underline">
            ✏️ Edit
          </button>
        )}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-10 lg:px-32">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
        🌍 TripHub Blogs
      </h2>

      {authUser && !showForm && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition"
          >
            ✍️ Create Blog
          </button>
        </div>
      )}

      {authUser && showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto mb-10"
        >
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            className="w-full mb-3 p-3 border rounded-lg focus:outline-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Share your experience..."
            className="w-full mb-4 p-3 border rounded-lg focus:outline-blue-500"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
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
              className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {blogs.length === 0 ? (
        <p className="text-gray-600 text-center mt-10 text-lg">
          No blogs yet. Be the first to share your travel story! ✈️
        </p>
      ) : (
        <div className="relative">
          <div className="flex items-center justify-center mb-6 gap-8">
            <button
              onClick={prev}
              className="text-2xl text-blue-700 hover:text-blue-900"
              aria-label="Previous blog"
            >
              ◀
            </button>

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

            <button
              onClick={next}
              className="text-2xl text-blue-700 hover:text-blue-900"
              aria-label="Next blog"
            >
              ▶
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm">
            {currentIndex + 1} of {blogs.length}
          </p>
        </div>
      )}
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../api";
// import { useAuthStore } from "../store/useAuthStore";
// import { toast } from "react-toastify";

// function BlogCard({ blog, isAuthor, onEdit }) {
//   return (
//     <div className="bg-gray-100 p-6 rounded shadow w-full">
//       <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
//       <p className="text-gray-700 whitespace-pre-wrap mb-2">{blog.content}</p>
//       <p className="text-sm text-gray-500">By: {blog.author?.name || "Anonymous"}</p>
//       {isAuthor && (
//         <button
//           onClick={onEdit}
//           className="text-sm text-blue-500 mt-2 hover:underline"
//         >
//           Edit
//         </button>
//       )}
//     </div>
//   );
// }

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [editingBlog, setEditingBlog] = useState(null);
//   const [formData, setFormData] = useState({ title: "", content: "" });
//   const [showForm, setShowForm] = useState(false);
//   const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
//   const { authUser } = useAuthStore();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await axiosInstance.get("/home/blogs");
//         setBlogs(res.data);
//       } catch (error) {
//         toast.error("Failed to load blogs");
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingBlog) {
//         await axiosInstance.put(`/home/blogs/${editingBlog._id}`, formData);
//         toast.success("Blog updated");
//       } else {
//         await axiosInstance.post("/home/blogs", formData);
//         toast.success("Blog posted");
//       }
//       setEditingBlog(null);
//       setFormData({ title: "", content: "" });
//       setShowForm(false);
//       const res = await axiosInstance.get("/home/blogs");
//       setBlogs(res.data);
//     } catch (error) {
//       toast.error("Error submitting blog");
//     }
//   };

//   const startEdit = (blog) => {
//     setEditingBlog(blog);
//     setFormData({ title: blog.title, content: blog.content });
//     setShowForm(true);
//   };

//   const nextBlog = () => {
//     setCurrentBlogIndex((prev) => (prev + 1) % blogs.length);
//   };

//   const prevBlog = () => {
//     setCurrentBlogIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-6 px-4">
//       <h2 className="text-2xl font-bold mb-4">TripHub Community Blogs</h2>

//       {authUser && !showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Create Blog
//         </button>
//       )}

//       {authUser && showForm && (
//         <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             className="w-full mb-2 p-2 border rounded"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="content"
//             placeholder="Share your experience..."
//             className="w-full mb-2 p-2 border rounded"
//             value={formData.content}
//             onChange={handleChange}
//             rows="5"
//             required
//           ></textarea>
//           <div className="flex gap-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               {editingBlog ? "Update Blog" : "Post Blog"}
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setShowForm(false);
//                 setEditingBlog(null);
//                 setFormData({ title: "", content: "" });
//               }}
//               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {blogs.length === 0 ? (
//         <p className="text-gray-500">No blogs available yet. Be the first to post!</p>
//       ) : (
//         <div className="relative flex items-center justify-between gap-4">
//           <button
//             onClick={prevBlog}
//             className="text-blue-600 font-bold text-lg hover:underline"
//           >
//             ◀
//           </button>

//           <div className="flex-1">
//             <BlogCard
//               blog={blogs[currentBlogIndex]}
//               isAuthor={authUser && authUser._id === blogs[currentBlogIndex].author?._id}
//               onEdit={() => startEdit(blogs[currentBlogIndex])}
//             />
//           </div>

//           <button
//             onClick={nextBlog}
//             className="text-blue-600 font-bold text-lg hover:underline"
//           >
//             ▶
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
