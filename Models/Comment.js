const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Blog = require('./Blog'); // Import the Blog model

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    blogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Blog, // Reference the Blog model
            key: 'id'
        }
    }
});

// Define the relationship
Blog.hasMany(Comment, { foreignKey: 'blogId', onDelete: 'CASCADE' }); // One blog can have many comments
Comment.belongsTo(Blog, { foreignKey: 'blogId' }); // A comment belongs to one blog

module.exports = Comment;
