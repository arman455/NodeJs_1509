import { Prisma, PrismaClient } from '@prisma/client';
import  post_service   from "../../src/PostApp/post_service";
import client from '../Client/prismaClient';

async function getAllPosts(){
    try{
        let posts = await client.post.findMany({
        
        })
        return posts
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}
async function getPostById(id: number){
    try{
        let post = await client.post.findUnique({
            where:{
                id: id
            }
        })
        return post
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}

async function createPost(data: Prisma.PostCreateInput){
    try{
        const time = post_service.getDate();
        let post = await client.post.create({
            data: data
        })
        return post
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}  

async function createPosts() {
    try{
        const result = await post_service.allPosts(4)

        const createPosts = await client.post.createMany({
            data: result.posts
        });
        console.log(createPosts);
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}

async function updatePost() {
    try{
        const post = await client.post.update({
            where: {
                id: 1
            },

            data: {
                name: 'Updated Product!'
            }
        })
        console.log(post)
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }

}

async function findPost() {
    try{
        const post = await client.post.findUnique({
            where: {
                id: 2
            }
        })
        console.log(post)
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}

async function findPosts() {
    try {    
        const post = await client.post.findMany()
        console.log(post)
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}

async function deletePost() {
    try{
        const post = await client.post.delete({
            where: {
                id: 1
            }
        })
        console.log(post)
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }

}

async function findPostToComents(){
    try{
        const post = await client.post.findUnique({
            where: {
                id: 1
            },
            include: {
                Coment: true
            }
        })
        console.log(post)
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}




const productRepository = {
    getAllProducts:getAllPosts,
    getPostById:getPostById,
    createPost:createPost,
    findPostToComents:findPostToComents,
    deletePost:deletePost,
    findPosts:findPosts,
    findPost:findPost,
    updatePost:updatePost,
    createPosts:createPosts,
}
export default productRepository