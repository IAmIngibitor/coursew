const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

router.post('/posts', auth, postController.createPost);
router.get('/', postController.getPosts);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;