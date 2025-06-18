import React from "react";

export default function BlogCard({ blog, authUser, onEdit }) {
  return (
    <div className="min-w-[300px] max-w-sm bg-gray-100 p-4 rounded shadow flex-shrink-0">
      <h3 className="text-xl font-semibold">{blog.title}</h3>
      <p className="text-gray-700 whitespace-pre-wrap mt-2">{blog.content}</p>
      <p className="text-sm text-gray-500 mt-2">
        By: {blog.author?.name || "Anonymous"}
      </p>
      {authUser && authUser._id === blog.author?._id && (
        <button
          onClick={() => onEdit(blog)}
          className="text-sm text-blue-500 mt-2 hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}
