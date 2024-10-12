import { Request, Response } from 'express';
import postService from '../services/post_service';
import moment from "moment"

function getDateController(req: Request, res: Response){

    const context = {
        time: moment().format("YYYY/MM/DD  HH:mm:ss")
    }

    res.render('posts', context);
}

function allPostsController(req: Request, res: Response) {

    // res.sendFile(path.join(__dirname, './templates/posts.html'));

    const max = Number(req.query.max);

    const context = postService.allPosts(max);
    res.render('posts', context);

}

function createPostController (req: Request, res: Response) {
    const data = req.body;
    postService.createPost(data);
    res.send("okay");
}

function getPostByIdController (req: Request, res: Response) {

    // res.sendFile(path.join(__dirname, './templates/posts.html'));
    const id = Number(req.params.id);
    const data = postService.getPostById(id);
    if (id > 0 && id <= data.length){
        res.render('post', data.context)}
    else {
        const context = {
            message: "Такого поста не існує!",
            link: "/post/all"
        };
        res.render('error', context); 
        // res.status(404).send(`  - 2 спосіб реалізації нествореного посту!!!
        //     <h1>404 - Такого поста не існує!</h1>
        //     <a href="/posts">All posts</a>
        // `);
    }}

const postController = {
    allPosts: allPostsController,
    createPost: createPostController,
    getPostById: getPostByIdController,
    getDate: getDateController };

export default postController