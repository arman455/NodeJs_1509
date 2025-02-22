import  { Router } from 'express'
import postControllerApi from './postControllerApi';

const router = Router();

router.get('/all', postControllerApi.allPosts)
router.get('/:id', postControllerApi.postById)

export default router;