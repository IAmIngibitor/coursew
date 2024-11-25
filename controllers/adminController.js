const User = require('../models/user')

exports.getAdminProfile = async (req, res) => {
    try {
        const users = await User.findAll()
        res.render('profile', { user: req.user, users })
    } catch (err) {
        console.error(err)
        res.status(500).send('Ощибка сервера')
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        await User.destroy({ where: { id: userId } })
        res.status(200).send('Пользлватель удален')
    } catch (err) {
        console.error(err)
        res.status(500).send('Ошибка при удалении пользователя')
    }
}