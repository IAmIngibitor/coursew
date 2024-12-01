const userService = require('../services/userService')
const avatarService = require('../services/avatarService')

exports.getProfile = async (req, res) => {
    try {
        const users = req.user.role === 'admin' ? await userService.getAllUsers() : null
        res.render('profile', { user: req.user, users })
    } catch (err) {
        res.status(500).send('Ошибка загрузки профиля: ' + err.message)
    }
}

exports.uploadAvatar = async (req, res) => {
    try {
        const { file } = req
        const userId = req.user.id

        if (!file) {
            return res.status(400).json({ message: 'Файл не загружен' })
        }

        const avatarUrl = await avatarService.uploadToFtp(file, userId)
        await avatarService.saveAvatarUrl(userId, avatarUrl)
        res.redirect('/user/profile?successMessage=Аватарка успешно загружена!')
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при загрузке аватарки' })
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