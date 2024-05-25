import express from "express";
import { getPosts, getSinglePost, createPost } from "../controllers/postController";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/post/:id", getSinglePost);
router.post("/posts", createPost);

export default router;