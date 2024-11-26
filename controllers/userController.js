const userService = require('../services/userService')

exports.getProfile = async (req, res) => {
    try {
        const users = req.user.role === 'admin' ? await userService.getAllUsers() : null
        res.render('profile', { user: req.user, users })
    } catch (err) {
        res.status(500).send('Ошибка загрузки профиля: ' + err.message)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        if (req.user.id === parseInt(req.params.userId)) {
            return res.status(400).send('Нельзя удалить самого себя.')
        }
        await userService.deleteUserById(req.params.userId)
        res.redirect('/user/profile')
    } catch (err) {
        res.status(500).send('Ошибка удаления пользователя: ' + err.message)
    }
}