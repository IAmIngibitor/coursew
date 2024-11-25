const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = {}

auth.authenticate = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/login')
    // res.status(401).render('login', { error: 'Пожалуйста, выполните вход' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.id)

        if (!user) return res.redirect('/login')
        
        req.user = { id: user.id, username: user.username, role: user.role }
        next()
    } catch (err) {
        console.error(err)
        res.clearCookie('token')
        return res.redirect('/login')
    }
};

auth.ensureAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next()
    }
    return res.status(403).send('Доступ запрещен')
}

module.exports = auth