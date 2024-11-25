const User = require('../models/user');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при получении пользователей');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.status(200).send('Пользователь удалён');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при удалении пользователя');
    }
};