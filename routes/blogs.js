const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');

router.get('/get-blogs', blogController.getAllBlogs);


router.get('/:blogId', blogController.getBlogById);


router.post('/add-titles', blogController.postAddBlog);


router.post('/:blogId/comments', blogController.addComment);


router.delete('/:blogId/comments/:commentId', blogController.deleteComment);

module.exports = router;


