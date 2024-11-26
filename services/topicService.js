const Topic = require('../models/topic');
const User = require('../models/user');

exports.createTopic = async (content, userId) => {
    return await Topic.create({ content, user_id: userId });
};

exports.getAllTopics = async () => {
    return await Topic.findAll({
        include: [{ model: User, as: 'user', attributes: ['username'] }],
        order: [['createdAt', 'DESC']]
    });
};

exports.deleteTopicById = async (topicId, userId, userRole) => {
    const topic = await Topic.findByPk(topicId)
    if (!topic) {
        throw new Error('Пост не найден.')
    }

    if (userRole !== 'admin' && topic.user_id !== userId) {
        throw new Error('У вас нет прав на удаление этого поста.')
    }

    return await topic.destroy();
};
