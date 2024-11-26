const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, postController.createPost); // Создание поста
router.post('/delete/:postId', authMiddleware, postController.deletePost); // Удаление поста

module.exports = router;
