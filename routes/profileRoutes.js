const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user')

router.get('/profile', auth.authenticate, async (req, res) => { 
    const { username, role } = req.user

    if (role == 'admin') {
        const users = await User.findAll({ attributes: ['id', 'username'] })
        return res.render('profile', { username, role, users })
    }

    res.render('profile', { username, role, users: [] })
});

module.exports = router;