const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

class Post extends Model {}

Post.init({
    content: { type: DataTypes.TEXT, allowNull: false }
}, {
    sequelize, modelName: 'Post'
});

Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Post;