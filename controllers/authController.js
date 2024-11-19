const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password_hash: hashedPassword });
    res.status(201).json({ message: 'Пользователь зарегистрирован', user });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password_hash)) {
        const token = jwt.sign({ id:user.id, role: user.role }, process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.json({ message: 'Успешный вход', token });
        
    } else {
        res.status(401).json({ message: 'Неверные учетные данные' });
    }
};