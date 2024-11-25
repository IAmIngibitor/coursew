const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', (req, res) => { res.render("register") });
router.get('/login', (req, res) => { res.render("login") });
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
    res.clearCookie("token")
    res.redirect('/login')
})

// localhost:3000/users/create

//index.js
// -- users
// -- -- employee
// -- -- user
// 
// -registers

module.exports = router;