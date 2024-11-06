const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');

// Get all blogs
router.get('/get-blogs', blogController.getAllBlogs);

// Get a specific blog by ID
router.get('/:blogId', blogController.getBlogById);

// Add a new blog
router.post('/add-titles', blogController.postAddBlog);

// Add a comment to a blog
router.post('/:blogId/comments', blogController.addComment);

// Delete a comment
router.delete('/:blogId/comments/:commentId', blogController.deleteComment);

module.exports = router;


