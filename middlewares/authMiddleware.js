const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        req.user = null; // Устанавливаем пользователя как null для неавторизованных
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            req.user = null; // Пользователь не найден
            res.clearCookie('token')
            return next();
        }

        req.user = { id: user.id, username: user.username, role: user.role };
        next();
    } catch (err) {
        req.user = null; // Токен недействителен
        res.clearCookie('token')
        next();
    }
};
