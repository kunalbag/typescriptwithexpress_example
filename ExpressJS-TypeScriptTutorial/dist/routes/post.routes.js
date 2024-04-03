"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controller_1 = require("../controllers/posts.controller");
const router = (0, express_1.Router)();
router.route("/")
    .get(posts_controller_1.getPosts)
    .post(posts_controller_1.createPost);
router.route("/:postId")
    .get(posts_controller_1.getPost)
    .delete(posts_controller_1.deletePost)
    .put(posts_controller_1.updatePost);
exports.default = router;
