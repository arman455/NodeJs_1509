// Импорт не используется, нужно убрать
import express, { Express, Request, Response } from 'express'
import tagsControllerApi from './tagsControllerApi';
const router = express.Router();

router.get('/all', tagsControllerApi.allTags);

export default router;