import { Request, Response } from 'express';
import postService from './postService';

async function allPostsController(req: Request, res: Response) {
    const context = await postService.allPosts();

    if (context.status === "error") {
        res.status(404).send(context.message);
    } else {
        res.render('posts', { posts: context.data, username: res.locals.user?.username || 'Guest' });
    }
}

async function createPostController(req: Request, res: Response) {
    const data = req.body;
    console.log(data);

    const result = await postService.createPost(data);
    if (result.status === 'error') {
        res.status(400).send(result.message);
    } else {
        res.status(201).send('Post created successfully');
    }
}

async function getPostByIdController(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await postService.getPostById(id);

    if (result.status === "error") {
        res.status(404).send(result.message);
    } else {
        res.render('post', { post: result.data });
    }
}

async function deletePostController(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await postService.deletePost(id);

    if (result.status === 'error') {
        res.send(result.message);
    } else {
        res.send('Post deleted successfully');
    }
}

const postController = {
    allPosts: allPostsController,
    createPost: createPostController,
    deletePost: deletePostController,
    getPostById: getPostByIdController,
};

export default postController;