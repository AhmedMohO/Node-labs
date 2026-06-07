const Post = require("../models/posts");

const createPost = async (post) => {
    const newPost = await Post.create(post);
    return newPost;
}

const getPostById = async (id) => {
    const post = await Post.findById(id);
    return post;
}

const listPosts = async () => {
    const posts = await Post.find();
    return posts;
}

const updatePost = async (id, post, userId) => {
    const updatedPost = await Post.findOneAndUpdate({ _id: id, userId }, post, { new: true });
    // const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    return updatedPost;
}

const deletePost = async (id, userId) => {
    const deletedPost = await Post.findOneAndDelete({ _id: id, userId });
    return deletedPost;
}

module.exports = {
    createPost,
    getPostById,
    listPosts,
    updatePost,
    deletePost
}