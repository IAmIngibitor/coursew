const postService = require('../services/postService');
const User = require('../models/user');

exports.renderHomePage = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.render('home', { user: req.user, posts });
    } catch (err) {
        res.status(500).send('Ошибка загрузки главной страницы.' + err.message);
    }
};

exports.renderLoginPage = (req, res) => {
    res.render('login');
};

exports.renderRegisterPage = (req, res) => {
    res.render('register');
};

exports.renderProfilePage = async (req, res) => {
    try {
        const users = req.user.role === 'admin' ? await User.findAll() : null;
        res.render('profile', { user: req.user, users });
    } catch (err) {
        res.status(500).send('Ошибка загрузки профиля.' + err.message);
    }
};
