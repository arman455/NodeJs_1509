import postRepository from "./postRepository";
import { Prisma } from '@prisma/client';
import { IError, ISuccess } from "../types/type";
import { CreatePost, Post } from './type'

async function allPosts(): Promise<ISuccess<Post[]> | IError> {
    try {
        const posts = await postRepository.getAllPosts();

        if (!posts || posts.length === 0) {
            return { status: 'error', message: 'Posts not found' };
        }

        return { status: 'success', data: posts };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Internal server error' };
    }
}

async function createPost(data: CreatePost): Promise<ISuccess<Post> | IError> {
    try {
        const post = await postRepository.createPost(data);

        if (!post) {
            return { status: 'error', message: 'Post creation failed' };
        }

        return { status: 'success', data: post };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Internal server error' };
    }
}

async function getPostById(id: number): Promise<ISuccess<Post> | IError> {
    try {
        const post = await postRepository.getPostById(id);

        if (!post) {
            return { status: 'error', message: 'Post not found' };
        }

        return { status: 'success', data: post };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Internal server error' };
    }
}

async function deletePost(id: number): Promise<ISuccess<Post> | IError> {
    try {
        const post = await postRepository.deletePost(id);

        if (!post) {
            return { status: 'error', message: 'Post not found' };
        }

        return { status: 'success', data: post };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Internal server error' };
    }
}

const postService = {
    allPosts,
    createPost,
    getPostById,
    deletePost,
};

export default postService;