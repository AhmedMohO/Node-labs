const fs = require("fs").promises;

const readPosts = async () => {
    const data = await fs.readFile('./posts.json', 'utf-8');
    return JSON.parse(data);
}

const writePosts = async (posts) => {
    await fs.writeFile('./posts.json', JSON.stringify(posts));
}

const createPost = async (post) => {
    const posts = await readPosts();
    const newPost = {
        id: posts.length + 1,
        ...post
    }
    posts.push(newPost);
    await writePosts(posts);
    return newPost;
}

const getPostById = async (id) => {
    const posts = await readPosts();
    const post = posts.find(post => post.id === Number(id));
    return post;
}

const updatePost = async (id, post) => {
    const posts = await readPosts();
    const postIndex = posts.findIndex(post => post.id === Number(id));
    if (postIndex === -1) {
        return null;
    }
    posts[postIndex] = {
        ...posts[postIndex],
        ...post
    }
    await writePosts(posts);
    return posts[postIndex];
}

const deletePost = async (id) => {
    const posts = await readPosts();
    const postIndex = posts.findIndex(post => post.id === Number(id));
    if (postIndex === -1) {
        return null;
    }
    posts.splice(postIndex, 1);
    await writePosts(posts);
    return true;
}

module.exports = {
    readPosts,
    writePosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
}