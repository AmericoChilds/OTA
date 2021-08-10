import express from 'express';

// Import Route Logic
import { getPosts, createPost } from '../controllers/posts.js';

const router = express.Router();

// Routes
// localhost:5000/posts

router.get('/', getPosts)
router.get('/', createPost)

export default router;