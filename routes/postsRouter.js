const { Router } = require("express");

const postsController = require("../controllers/postsController");
const reqLogger = require("../middlewares/reqLogger");

const router = Router();

// /posts
router.post("/", postsController.createPost);
router.get("/", postsController.readPosts);
router.get("/:id", postsController.getPostById);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);



module.exports = router;
