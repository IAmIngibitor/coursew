const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', (req, res) => { res.render("register") });
router.get('/login', (req, res) => { res.render("login") });
router.post('/register', authController.register);
router.post('/login', authController.login);

// localhost:3000/users/create

//index.js
// -- users
// -- -- employee
// -- -- user
// 
// -registers

module.exports = router;