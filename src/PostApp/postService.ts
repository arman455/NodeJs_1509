import postRepository from "./postRepository";
import { IError, ISuccess } from "../types/type";
import { CreatePost, PostWithTags } from './type'

// Во-первых, от try catch тут нет смысла, тк они есть в репо
// Во-вторых, в случае ошибки призмы ты кидаешь нулл из репо, а здесь обрабатываешь криво пример ниже

async function allPosts(): Promise<ISuccess<PostWithTags[]> | IError> {
    try {
        const posts = await postRepository.getAllPosts();
        // Если posts = null (в случае ошибки призмы) вернешь клиенту Posts not Found, 
        // что является ложью и в принципе при получении всех постов невозможно(будет пустой массив, но не нулл)
        // Должен обрабатывать нулл и в случае нулл уже Internal server error
        if (!posts || posts.length === 0) {
            return { status: 'error', message: 'Posts not found' };
        }

        return { status: 'success', data: posts };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Internal server error' };
    }
}

async function createPost(data: CreatePost): Promise<ISuccess<PostWithTags> | IError> {
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

async function getPostById(id: number): Promise<ISuccess<PostWithTags> | IError> {
    try {
        // Смотри что по типам возвращается. Вроде бы ты из репо ретурнишь нулл при ошибке, 
        // НО также делает и призма, если пост не найден
        // В таком случае уже неправильно обрабатывается нулл и нулл в таком случае возвращать неправильно
        // Как вариант - объект с ошибкой, а клиенту bad backend, строкой возвращать сообщение об ошибки или еще куча вариантов) 
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

async function deletePost(id: number): Promise<ISuccess<PostWithTags> | IError> {
    try {
        // as? убираем фиксим типы
        const post = await postRepository.deletePost(id) as PostWithTags;

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