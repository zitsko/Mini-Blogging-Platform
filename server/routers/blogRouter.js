const express = require('express')
const router = express.Router()

router.get("/blogs",getAllBlogs);
router.post("/create",createBlog);
router.get("/blogs/:userId",getUserBlogs);
router.put("/blogs/:blogId",editBlog);
router.delete("/blogs/:blogId",deletetBlog);

module.exports = router

