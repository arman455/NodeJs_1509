import express, { Express, Request, Response } from 'express'
const router = express.Router();
import authController from './authController';
import regController from './regController';

router.post('/login', authController.authLogin);
router.get('/login', authController.authGetLogin);

router.post('/registration', regController.authRegistrtation);
router.get('/registration', regController.authGetRegistrtation);


export default router;