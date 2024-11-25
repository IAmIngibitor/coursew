const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')

router.get('/profile', auth.ensureAdmin, adminController.getAdminProfile)
router.delete('/user/:id', auth.ensureAdmin, adminController.deleteUser)

module.exports = router