import postRepository from "./postRepository";
import { IError, ISuccess } from "../types/type";
import { CreatePost, Post, PostWithTagsComments } from './type'

async function allPosts(): Promise<ISuccess<PostWithTagsComments[]> | IError> {
    const posts = await postRepository.getAllPostsWithComments()

    if (!posts) {
        return { status: 'error', message: 'No posts found' }
    }

    return { status: 'success', data: posts }

}

async function createPost(data: CreatePost): Promise<ISuccess<PostWithTagsComments> | IError> {
    const post = await postRepository.createPost(data)

    if (!post) {
        return { status: 'error', message: 'Post creation failed' }
    }

    return { status: 'success', data: post }
}

async function getPostById(id: number): Promise<ISuccess<PostWithTagsComments> | IError> {
    const post = await postRepository.getPostWithCommentsById(id);

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