import express from 'express'
import postController from './postController';

const router = express.Router();

router.post('/create', postController.createPost)

router.get('/all', postController.allPosts)

router.get('/:id', postController.getPostById)

router.delete('/delete/:id', postController.deletePost)

export default router;