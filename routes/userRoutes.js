const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/', userController.getUsers);
router.delete('/:id', auth.authenticate, auth.ensureAdmin, userController.deleteUser);

module.exports = router;