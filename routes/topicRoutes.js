const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, topicController.createTopic); // Создание поста
router.post('/delete/:topicId', authMiddleware, topicController.deleteTopic); // Удаление поста

module.exports = router;
