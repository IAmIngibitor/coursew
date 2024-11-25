const authService = require('../services/authService')

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = await authService.registerUser(username, password, role)
        res.render("profile", { username: username, role: user.role});
    } catch (err) {
        res.status(500).send('Ошибка при регистрации')
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const { token, user } = await authService.loginUser(username, password)
        res.cookie("token", token, { httpOnly:true, secure: true })
        res.render("profile", { username: user.username, role: user.role })
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
};