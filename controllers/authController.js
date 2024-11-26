const authService = require('../services/authService');

exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).send('Недопустимая роль.');
        }
        await authService.registerUser(username, password, role);
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Ошибка регистрации: ' + err.message);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token, user } = await authService.loginUser(username, password);
        res.cookie('token', token, { httpOnly: true, secure: false })
        res.redirect('/')
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

exports.logoutUser = (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Ошибка выхода: ' + err.message);
    }
};

