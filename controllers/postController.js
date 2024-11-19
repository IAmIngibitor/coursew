const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res) => {
    const { content } = req.body;
    const post = await Post.create({ content, user_id: req.user.id });
    res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
    const posts = await Post.findAll({ include: [{ model: User, as: 'user' }] });
    res.render("index", { posts: posts });
};

exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    await Post.destroy({ where: { id: postId } });
    res.status(204).send();
};