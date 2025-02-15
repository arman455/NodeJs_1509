import { Prisma, PrismaClient } from '@prisma/client';
import { CreateComment } from './types';

const client = new PrismaClient();

async function getCommentsByPostId(postid: number) {
    try {
        const comments = await client.coment.findMany({
            where: {
                postid: postid,
            },
        });
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return null;
    }
}

async function createComment(data: CreateComment) {
    try {
        const comment = await client.coment.create({ data });
        return comment;
    } catch (error) {
        console.error('Error creating comment:', error);
        return null;
    }
}

const commentRepository = {
    getCommentsByPostId,
    createComment,
};

export default commentRepository;