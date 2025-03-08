import { IError, ISuccess } from "../types/type";
import commentRepository from "./commentRepository";
import { Comment, CreateComment } from "./types";

async function getCommentsByPostId(postid: number): Promise<ISuccess<Comment[]> | IError> {
    const comments = await commentRepository.getCommentsByPostId(postid)

    if (!comments) {
        return { status: 'error', message: 'Comments not found' }
    }

    return { status: 'success', data: comments }


}

async function createComment(data: CreateComment): Promise<ISuccess<Comment> | IError> {
    const comment = await commentRepository.createComment(data)

    if (!comment) {
        return { status: 'error', message: 'Failed to create comment' }
    }

    return { status: 'success', data: comment }


}

const commentService = {
    getCommentsByPostId,
    createComment,
};

export default commentService;