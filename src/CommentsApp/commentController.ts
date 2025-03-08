import { Request, Response } from 'express';
import commentService from './commentService';

async function getCommentsByPostId(req: Request, res: Response) {
    const postid = Number(req.params.id);
    const result = await commentService.getCommentsByPostId(postid);
    return res.json(result);
}

async function createComment(req: Request, res: Response) {
    const data = req.body;
    const result = await commentService.createComment(data);
    return res.json(result);
}

const commentController = {
    getCommentsByPostId,
    createComment,
};

export default commentController;