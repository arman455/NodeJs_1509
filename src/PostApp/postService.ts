import postRepository from "./postRepository";
import { Prisma, PrismaClient } from '@prisma/client';

type Post = {
    name: string;
    author: string;
    description: string;
    time: string;
    userId: number;
};
async function allPosts (max: number){
    
    const context = {
        posts: await postRepository.getAllProducts() || [] 
    };
    return context

}
async function createPost(data: { Post: Prisma.PostCreateInput }){
    const context = {
        post : await postRepository.createPost(data.Post)
    }
    return context
}
async function getPostById(id: number) {

    const context = {
        post: await postRepository.getPostById(id)
    }
    return context
}
const post_service =  {
    allPosts: allPosts,
    createPost: createPost,
    getPostById: getPostById};
export default post_service;