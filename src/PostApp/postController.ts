import { Request, Response } from 'express';
import postService from './postService';
import moment from "moment"

async function allPostsController(req: Request, res: Response) {
    // res.sendFile(path.join(__dirname, './templates/posts.html'));
    const max = Number(req.query.max);
    const context = await postService.allPosts(max);
    // res.render('posts', context);
    res.render('posts', {posts: context.posts, username: res.locals.username});
    console.log(res.locals.user)


}
async function createPostController (req: Request, res: Response) {
    const data = req.body;
    await postService.createPost(data);
    res.send("okay");   
    console.log(data.userId);
}
async function getPostByIdController (req: Request, res: Response) {
    // res.sendFile(path.join(__dirname, './templates/posts.html'));
    const id = Number(req.params.id);
    const data = postService.getPostById(id);
}
const postController = {
    allPosts: allPostsController,
    createPost: createPostController,
    getPostById: getPostByIdController};
    
export default postController