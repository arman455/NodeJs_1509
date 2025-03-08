import postRepository from "./postRepository";
import { IError, ISuccess } from "../types/type";
import { CreatePost, Post, PostWithTags } from './type'

async function allPosts(): Promise<ISuccess<PostWithTags[]> | IError> {
    const posts = await postRepository.getAllPosts()

    if (!posts) {
        return { status: 'error', message: 'No posts found' }
    }

    return { status: 'success', data: posts }

}

async function createPost(data: CreatePost): Promise<ISuccess<PostWithTags> | IError> {
    const post = await postRepository.createPost(data)

    if (!post) {
        return { status: 'error', message: 'Post creation failed' }
    }

    return { status: 'success', data: post }
}

async function getPostById(id: number): Promise<ISuccess<PostWithTags> | IError> {
    const post = await postRepository.getPostById(id);

    if (!post) {
        return { status: 'error', message: 'Post not found' }
    }

    return { status: 'success', data: post }

}

async function deletePost(id: number): Promise<ISuccess<Post> | IError> {
    const post = await postRepository.deletePost(id)

    if (!post) {
        return { status: 'error', message: 'Post not found' }
    }

    return { status: 'success', data: post }

}

const postService = {
    allPosts,
    createPost,
    getPostById,
    deletePost,
};

export default postService;