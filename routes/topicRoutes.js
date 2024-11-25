const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')

router.post('/topic', auth.authenticate, postController.createPost);
router.get('/', postController.getPosts);
router.delete('/post/:id', auth.authenticate, auth.ensureAdmin, postController.deletePost);

module.exports = router