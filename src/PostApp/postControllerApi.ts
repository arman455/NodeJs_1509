import { Request, Response } from 'express';
import postService from './postService';

async function allPostsController(req: Request, res: Response) {
    const context = await postService.allPosts();
    // Здесь такой стиль написания возврата
    res.json(context);
}

async function postByIdController(req: Request, res: Response) {
    const id = req.params.id
    const context = await postService.getPostById(+id)
    // Здесь иной. Делай все под один стиль, если обрабатываешь ошибку из сервиса таким образом
    // Тогда делай так везде
    if (context.status === "error") {
        res.status(404).json({ message: 'Post not found' })
        return
    }
    res.json(context.data)
}

const postControllerApi = {
    allPosts: allPostsController,
    postById: postByIdController,
};

export default postControllerApi;