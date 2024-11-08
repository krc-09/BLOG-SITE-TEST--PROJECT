const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Blog = require('./Blog'); 

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
            model: Blog,
            key: 'id'
        }
    }
});

Blog.hasMany(Comment, { foreignKey: 'blogId', onDelete: 'CASCADE' }); 
Comment.belongsTo(Blog, { foreignKey: 'blogId' }); 

module.exports = Comment;
