const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController.js')

// router.get("/blogs",blogController.getAllBlogs);
// router.post("/create",blogController.createBlog);
// router.get("/blogs/:userId",blogController.getUserBlogs);
// router.put("/blogs/:blogId",blogController.editBlog);
// router.delete("/blogs/:blogId",blogController.deletetBlog);

router.get("/",blogController.getAllBlogs);
router.post("/",blogController.createBlog);
router.get("/:userId",blogController.getUserBlogs);
router.put("/:blogId",blogController.editBlog);
router.delete("/:blogId",blogController.deleteBlog);

module.exports = router

