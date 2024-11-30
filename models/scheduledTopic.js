const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./user')

const ScheduledTopic = sequelize.define('ScheduledTopic', {
    content: { type: DataTypes.STRING(1000), allowNull: false },
    user_id: DataTypes.INTEGER,
    scheduledAt: { type: DataTypes.DATE, allowNull: false },
    published: { type: DataTypes.BOOLEAN, defaultValue: false }
})

ScheduledTopic.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE'})

module.exports = ScheduledTopic