const { Router } = require("express");

const postsController = require("../controllers/postsController");
const { createPostSchema, updatePostSchema, validate } = require("../middlewares/validators");

const router = Router();

// /posts
router.post("/", validate(createPostSchema), postsController.createPost);
router.get("/", postsController.readPosts);
router.get("/:id", postsController.getPostById);
router.put("/:id", validate(updatePostSchema), postsController.updatePost);
router.delete("/:id", postsController.deletePost);



module.exports = router;
