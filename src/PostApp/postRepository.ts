import { PrismaClient } from '@prisma/client';
import { CreatePost } from './type';

const client = new PrismaClient();

async function getAllPosts() {
    try {
        const posts = await client.post.findMany();
        return posts;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getPostById(id: number) {
    try {
        const post = await client.post.findUnique({
            where: { id },
        });
        return post;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function createPost(data: CreatePost) {
    try {
        const post = await client.post.create({ data });
        return post;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function deletePost(id: number) {
    try {
        const post = await client.post.delete({
            where: { id },
        });

        return post;
    } catch (error) {
        console.error('Error deleting post:', error);
        return null;
    }
}

async function getAllPostsWithComments() {
    try {
        const posts = await client.post.findMany({
            include: {
                Coment: true,
            },
        });
        return posts;
    } catch (error) {
        console.error('Error fetching posts with comments:', error);
        return null;
    }
}

async function getPostWithCommentsById(postId: number) {
    try {
        const post = await client.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                Coment: true,
            },
        });
        return post;
    } catch (error) {
        console.error('Error fetching post with comments:', error);
        return null;
    }
}

const postRepository = {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    getAllPostsWithComments,
    getPostWithCommentsById
};

export default postRepository;