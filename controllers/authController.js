const authService = require('../services/authService')

exports.registerUser = async (req, res) => {
    const { username, password, confirmPassword, role} = req.body
    if (password !== confirmPassword) {
        return res.render('register', { errorMessage: 'Пароли не совпадают.', username })
    }
    if (await authService.checkUsername(username) != null) {
        return res.render('register', { errorMessage: 'Имя пользователя уже занято. Пожалуйста, выберите другое.', username })
    };
    try {
        if (!['user', 'admin'].includes(role || 'user')) {
            return res.status(400).send('Недопустимая роль.')
        }
        await authService.registerUser(username, password, role || 'user')
        res.redirect('/login?successMessage=Регистрация успешна! Теперь войдите.')
    } catch (err) {
        console.log(username)
        res.status(500).send('Ошибка регистрации: ' + err.message)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if (await authService.checkUsernamePassword(username, password)) {
            const { token, user } = await authService.loginUser(username, password)
            res.cookie('token', token, { httpOnly: true, secure: false })
            res.redirect('/')
        } else {
            return res.render('login', { errorMessage: 'Неверное имя пользователя или пароль', username });
        }
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

exports.logoutUser = (req, res) => {
    try {
        res.clearCookie('token')
        res.redirect('/login')
    } catch (err) {
        res.status(500).send('Ошибка выхода: ' + err.message)
    }
}
