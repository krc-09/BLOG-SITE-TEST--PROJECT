
const Blog = require('../Models/Blog');
const Comment = require('../Models/Comment');


exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: {
                model: Comment, 
                required: false 
            }
        });                                                                                                          
        res.json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching blogs");
    }
};


exports.postAddBlog = (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content, and author are mandatory' });
    }

    Blog.create(
        { title, content, author }
    )
        .then(newBlog => {
            res.status(201).json(newBlog);
        })
        .catch(err => {
            console.error('Error adding blog:', err);
            res.status(500).json({ error: 'An error occurred while adding the blog' });
        });
};


exports.addComment = (req, res) => {
    const blogId = req.params.blogId;
    const { commentText } = req.body;

    if (!commentText) {
        return res.status(400).json({ error: 'Comment text is required' });
    }

    Comment.create({ text: commentText, blogId })
        .then(newComment => {
           
            res.status(201).json(newComment);  
        })
        .catch(err => {
            console.error('Error adding comment:', err);
            res.status(500).json({ error: 'An error occurred while adding the comment' });
        });
};


exports.deleteComment = (req, res) => {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;

    Comment.destroy({ where: { id: commentId, blogId } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.status(200).json({ message: 'Comment deleted' });
        })
        .catch(err => {
            console.error('Error deleting comment:', err);
            res.status(500).json({ error: 'An error occurred while deleting the comment' });
        });
};

exports.getBlogById = (req, res) => {
    const blogId = req.params.blogId;
    Blog.findByPk(blogId, {
        include: Comment
    })
    .then(blog => {
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the blog' });
    });
};
