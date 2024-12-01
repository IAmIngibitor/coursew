const { Op } = require('sequelize')
const ScheduledTopic = require('../models/scheduledTopic')
const topicService = require('./topicService')

const publishScheduledTopics = async () => {
    try {
        const now = new Date()
        console.log(`Проверка отложенных постов. Текущее время: ${now}`)
        const topicsToPublish = await ScheduledTopic.findAll({ where: { scheduledAt: { [Op.lte]: now }, published: false } })
        console.log(`Найдено постов для публикации: ${topicsToPublish.length}`)

        for (const topic of topicsToPublish) {
            await topicService.createTopic(topic.content, topic.user_id)
            topic.published = true
            await topic.save()
        }
    } catch (err) {
        console.error('Ошибка при пубдикации отложенных постов', err)
    }
}

module.exports = { publishScheduledTopics }
