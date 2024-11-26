const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/profile', authMiddleware, userController.getProfile)
router.post('/delete/:userId', authMiddleware, userController.deleteUser)

module.exports = router
