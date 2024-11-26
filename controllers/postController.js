const postService = require('../services/postService');

exports.createPost = async (req, res) => {
    const { content } = req.body;
    try {
        if (!content.trim()) {
            return res.status(400).send('Пост не может быть пустым.');
        }
        await postService.createPost(content, req.user.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Ошибка создания поста: ' + err.message);
    }
};

exports.deletePost = async (req, res) => {
    try {
        await postService.deletePostById(req.params.postId, req.user.id, req.user.role);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Ошибка удаления поста: ' + err.message);
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.render('home', { user: req.user, posts });
    } catch (err) {
        res.status(500).send('Ошибка загрузки постов: ' + err.message);
    }
};

