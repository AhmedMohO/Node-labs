const postService = require("../services/postsService");
const ApiError = require("../utils/ApiError");
const handleAsync = require("../utils/handleAsync");


const createPost = handleAsync(async (req, res) => {
    const newPost = await postService.createPost(req.body);

    res.status(201).json({ message: "post created successfully", data: newPost });
});

const readPosts = handleAsync(async (req, res) => {
    const posts = await postService.readPosts();
    res.json({ message: 'posts fetched successfully', data: posts });
});

const getPostById = handleAsync(async (req, res) => {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
        throw new ApiError(404, "post not found");
    }

    res.json({ message: 'post fetched successfully', data: post });
});

const updatePost = handleAsync(async (req, res) => {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    if (!updatedPost) {
        throw new ApiError(404, "post not found");
    }
    res.json({ message: 'post updated successfully', data: updatedPost });
});

const deletePost = handleAsync(async (req, res) => {
    const deletedPost = await postService.deletePost(req.params.id);
    if (!deletedPost) {
        throw new ApiError(404, "post not found");
    }
    res.json({ message: 'post deleted successfully' });
});

module.exports = {
    createPost,
    readPosts,
    getPostById,
    updatePost,
    deletePost
}