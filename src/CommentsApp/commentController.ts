import { Request, Response } from 'express';
import commentService from './commentService';

async function getCommentsByPostId(req: Request, res: Response) {
    const postid = Number(req.params.id);
    const result = await commentService.getCommentsByPostId(postid);

    if (result.status === "error") {
        return res.send(result.message);
    }

    return res.json(result.data);
}

async function createComment(req: Request, res: Response) {
    const data = req.body;
    const result = await commentService.createComment(data);

    if (result.status === 'error') {
        return res.send(result.message);
    }

    return res.send('Comment created successfully!');
}

const commentController = {
    getCommentsByPostId,
    createComment,
};

export default commentController;