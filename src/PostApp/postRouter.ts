import express, { Express, Request, Response } from 'express'
const router = express.Router();
import postController from './postController';

router.post('/create', postController.createPost)

router.get('/all', postController.allPosts)

router.get('/:id', postController.getPostById)

router.delete('/delete/:id', postController.deletePost)

export default router;