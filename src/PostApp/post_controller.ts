import { Request, Response } from 'express';
import postService from './post_service';
import moment from "moment"

async function getDateController(req: Request, res: Response) {
    const context = {
        time: moment().format("YYYY/MM/DD HH:mm:ss")
    };

    res.render('posts', context);
}

async function allPostsController(req: Request, res: Response) {
    const max = Number(req.query.max)

    const context = await postService.allPosts(max); 

    res.render('posts', context);
}

async function createPostController(req: Request, res: Response) {
    const data = req.body;

    await postService.createPost(data);

    res.send("okay");
}


async function getPostByIdController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        
        const data = await postService.getPostById(id);
        
        if (id > 0 && data) {
            res.render('post', { post: data }); 
        } else {
            const context = {
                message: "Такого поста не існує!",
                link: "/post/all"
            };
            res.render('error', context);
        }
    } catch (error) {
        const context = {
            message: "Сталася помилка під час отримання поста!",
            link: "/post/all"
        };
        res.status(500).render('error', context);
    }
}


const postController = {
    allPosts: allPostsController,
    createPost: createPostController,
    getPostById: getPostByIdController,
    getDate: getDateController };

export default postController