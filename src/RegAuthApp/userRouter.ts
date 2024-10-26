import express, { Express, Request, Response } from 'express'
const router = express.Router();
import userController from './userController';

router.post('/login', userController.authLogin);
router.post('/registration', userController.authRegistrtation);

export default router;