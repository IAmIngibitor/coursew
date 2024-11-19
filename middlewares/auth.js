const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).send('Требуется токен');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Недействительный токен');
        req.user = user;
        next();
    });
};