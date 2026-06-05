const postService = require("../services/postsService");


const createPost = async (req, res) => {
    flfkldmls;
    const newPost = await postService.createPost(req.body);

    res.status(201).json({ message: "post created successfully", data: newPost });
}

const readPosts = async (req, res) => {
    const posts = await postService.readPosts();
    res.json({ message: 'posts fetched successfully', data: posts });
}

const getPostById = async (req, res) => {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "post not found"
        });
    }

    res.json({ message: 'post fetched successfully', data: post });
}

const updatePost = async (req, res) => {
    const updatePost = await postService.updatePost(req.params.id, req.body);
    if (!updatePost) {
        return res.status(404).json({
            message: "post not found"
        });
    }
    res.json({ message: 'post updated successfully', data: updatePost });
}

const deletePost = async (req, res) => {
    const deletePost = await postService.deletePost(req.params.id);
    if (!deletePost) {
        return res.status(404).json({
            message: "post not found"
        });
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