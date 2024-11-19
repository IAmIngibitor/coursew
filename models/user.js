const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
}, {
    sequelize, modelName: 'User'
});

module.exports = User;