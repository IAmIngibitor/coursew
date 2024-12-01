const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/profile', authMiddleware, userController.getProfile)
router.post('/upload', upload.single('avatar'), authMiddleware, userController.uploadAvatar)
router.post('/delete/:userId', authMiddleware, userController.deleteUser)

module.exports = router
