import express, { Express, Request, Response } from 'express'
const router = express.Router();
import postController from './postController';

router.post('/create', postController.createPost)

router.get('/all', postController.allPosts)

router.get('/:id', postController.getPostById)

export default router;