import  { Router } from 'express'
import postControllerApi from './postControllerApi';

const router = Router();

router.get('/all', postControllerApi.allPosts)

export default router;