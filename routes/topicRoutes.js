const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, topicController.createTopic)
router.post('/delete/:topicId', authMiddleware, topicController.deleteTopic)

module.exports = router
