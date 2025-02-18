import { Request, Response } from 'express';
import postService from './postService';

async function allPostsController(req: Request, res: Response) {
    const context = await postService.allPosts();
    res.json(context);
}

const postControllerApi = {
    allPosts: allPostsController,
};

export default postControllerApi;