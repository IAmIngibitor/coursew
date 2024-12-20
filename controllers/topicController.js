const ScheduledTopic = require('../models/scheduledTopic')
const topicService = require('../services/topicService')

exports.createTopic = async (req, res) => {
    const { content, isScheduled, scheduledAt } = req.body
    try {
        if (!content.trim()) {
            return res.status(400).send('Пост не может быть пустым.')
        }
        if (isScheduled === 'on' && scheduledAt) {
            await ScheduledTopic.create({ content, user_id: req.user.id, scheduledAt: new Date(scheduledAt) })
        } else {
            await topicService.createTopic(content, req.user.id)
        }
        res.redirect('/')
    } catch (err) {
        res.status(500).send('Ошибка создания поста: ' + err.message)
    }
}

exports.deleteTopic = async (req, res) => {
    try {
        await topicService.deleteTopicById(req.params.topicId, req.user.id, req.user.role)
        res.redirect('/')
    } catch (err) {
        res.status(500).send('Ошибка удаления поста: ' + err.message)
    }
}

exports.getAllTopics = async (req, res) => {
    try {
        const topics = await topicService.getAllTopics()
        res.render('home', { user: req.user, topics })
    } catch (err) {
        res.status(500).send('Ошибка загрузки постов: ' + err.message)
    }
}
