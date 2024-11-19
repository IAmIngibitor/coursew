const User = require('../models/user');

exports.getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.deleteUser = async (req, res) => {
    const userId = req.param.id;
    await User.destroy({ where: { id: userId } });
    res.status(204).send();
};