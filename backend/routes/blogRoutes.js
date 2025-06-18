const express = require("express");
const router = express.Router();
const { getAllBlogs, createBlog, updateBlog } = require("../controllers/blogController");
const auth = require("../middleware/authMiddleware");

router.get("/", getAllBlogs);
router.post("/", auth, createBlog);
router.put("/:id", auth, updateBlog);

module.exports = router;