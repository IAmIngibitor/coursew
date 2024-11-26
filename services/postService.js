const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (content, userId) => {
    return await Post.create({ content, user_id: userId });
};

exports.getAllPosts = async () => {
    return await Post.findAll({
        include: [{ model: User, as: 'user', attributes: ['username'] }],
        order: [['createdAt', 'DESC']], // Сортировка по дате создания (новые посты сверху)
    });
};

exports.deletePostById = async (postId, userId, userRole) => {
    const post = await Post.findByPk(postId);
    if (!post) {
        throw new Error('Пост не найден.');
    }

    // Проверка на право удаления
    if (userRole !== 'admin' && post.user_id !== userId) {
        throw new Error('У вас нет прав на удаление этого поста.');
    }

    return await post.destroy();
};
