const postService = require("../services/postsService");
const APIError = require("../utils/APIError");

const createPost = async (req, res) => {
    const newPost = await postService.createPost(req.body);
    res.status(201).json({ message: "post created successfully", data: newPost });
}

const readPosts = async (req, res) => {
    const posts = await postService.listPosts();
    res.json({ message: 'posts fetched successfully', data: posts });
}

const getPostById = async (req, res) => {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
        throw new APIError("post not found", 404);
    }

    res.json({ message: 'post fetched successfully', data: post });
}

const updatePost = async (req, res) => {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    if (!updatedPost) {
        throw new APIError("post not found", 404);
    }
    res.json({ message: 'post updated successfully', data: updatedPost });
}

const deletePost = async (req, res) => {
    const deletedPost = await postService.deletePost(req.params.id);
    if (!deletedPost) {
        throw new APIError("post not found", 404);
    }
    res.json({ message: 'post deleted successfully' });
}

module.exports = {
    createPost,
    readPosts,
    getPostById,
    updatePost,
    deletePost
}