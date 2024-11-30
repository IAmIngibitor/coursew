const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.checkUsername = async (username) => {
    return await User.findOne({ where: {username} })
}

exports.registerUser = async (username, password, role) => {
    const password_hash = await bcrypt.hash(password, 10)
    return await User.create({ username, password_hash, role })
}

exports.checkUsernamePassword = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username } })
        if (user && await bcrypt.compare(password, user.password_hash)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

exports.loginUser = async (username) => {
    const user = await User.findOne({ where: { username } })
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET)
    return { token, user }
};
