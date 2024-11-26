const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    user_id: DataTypes.INTEGER,
});

Post.prototype.formattedDate = function () {
    return this.createdAt.toLocaleString();
};

Post.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Post;
