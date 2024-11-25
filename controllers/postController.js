const Post = require('../models/post')
const User = require('../models/user')
const postService = require('../services/postService')

exports.createPost = async (req, res) => {
        try {
            const { content } = req.body
            const newPost = await Post.create({ content, user_id: req.user.id })
            res.status(201).json(newPost)
        } catch (err) {
            console.error(err)
            res.status(500).send('Ошибка при создании поста')
        }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, as: 'user', attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Ошибка при получении постов')
    }
}

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        await Post.destroy({ where: { id: postId } })
        return res.status(200).send('Пост удален')
    } catch (err) {
        console.error(err)
        res.status(500).send('Ошибка при удалении поста')
    }
}