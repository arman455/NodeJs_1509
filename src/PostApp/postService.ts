import postRepository from "./postRepository";
import { Prisma } from '@prisma/client';

interface IPost {
    id: number;
    name: string;
    author: string;
    description: string | null;
    time: string;
    userId: number;
}

interface IPostSuccess {
    status: 'success';
    data: IPost;
}

interface IPostError {
    status: 'error';
    message: string;
}

interface IPostsSuccess {
    status: 'success';
    data: IPost[];
}

async function allPosts(): Promise<IPostsSuccess | IPostError> {
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

async function createPost(data: Prisma.PostCreateInput): Promise<IPostSuccess | IPostError> {
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

async function getPostById(id: number): Promise<IPostSuccess | IPostError> {
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

async function deletePost(id: number): Promise<IPostSuccess | IPostError> {
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