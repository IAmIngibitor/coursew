const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./user')

const Topic = sequelize.define('Topic', {
    content: DataTypes.STRING(1000),
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    user_id: DataTypes.INTEGER,
})

Topic.prototype.formattedDate = function () {
    return this.createdAt.toLocaleString()
}

Topic.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' })

module.exports = Topic
