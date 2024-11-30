const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' }
}, { timestamps: true })

User.afterSync(async () => {
    try {
        const [user, created] = await User.findOrCreate({
            where: { username: 'admin' },
            defaults: {
                password_hash: '$2a$12$F6pbXbuiJrtE6xp5J3p6t.z7qYxbNH.iK/LEMpmMoqUoVzvFmEDrK',
                role: 'admin'
            }
        })
        if (created) {
            console.log('Пользователь admin создан')
        } else {
            console.log('Пользователь admin уже был создан')
        }
    } catch (error) {
        console.error('Ошибка в создании пользователя admin:', error)
    }
})

module.exports = User
