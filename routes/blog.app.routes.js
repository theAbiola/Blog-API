import express from 'express';
import {
    renderMainPage,
    renderNewPostPage,
    renderEditPage,
    createPost,
    updatePost,
    deletePost
} from '../controllers/blogAppController.js';

const router = express.Router();

// Route to render the main page
router.get("/", renderMainPage);

// Route to render the new post page
router.get("/new", renderNewPostPage);

// Route to render the edit page
router.get("/edit/:id", renderEditPage);

// Create a new post
router.post("/api/posts", createPost);

// Partially update a post
router.post("/api/posts/:id", updatePost);

// Delete a post
router.get("/api/posts/delete/:id", deletePost);

export default router;