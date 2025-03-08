import { Request, Response } from 'express';
import postService from './postService';

async function allPostsController(req: Request, res: Response) {
    const context = await postService.allPosts();
    res.json(context);
}

async function postByIdController(req: Request, res: Response) {
    const id = req.params.id
    const context = await postService.getPostById(+id)
    res.json(context)
}

const postControllerApi = {
    allPosts: allPostsController,
    postById: postByIdController,
};

export default postControllerApi;