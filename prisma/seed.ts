import { PrismaClient } from "@prisma/client";
import  post_service   from "./../src/services/post_service";

const prisma = new PrismaClient()

async function createPost(){
    const time = post_service.getDate();
    const post = await prisma.post.create({
        data: {
            name: "post1",
            author: "sema",
            description: "zxc",
            time: time
        }
    })
    console.log(post)
}

async function createPosts(){

    const posts = await post_service.allPosts(4).posts;
    const createPosts = await prisma.post.createMany({
        data: posts
    })
    console.log(createPosts)
}

async function updatePost() {

    const post = await prisma.post.update({
        where: {
            id: 1
        },

        data: {
            name: 'Updated Product!'
        }
    })
    console.log(post)
}

async function findPost() {
    const post = await prisma.post.findUnique({
        where: {
            id: 2
        }
    })
    console.log(post)
}

async function findPosts() {
    const post = await prisma.post.findMany()
    console.log(post)
}

async function deletePost() {
    const post = await prisma.post.delete({
        where: {
            id: 2
        }
    })
    console.log(post)
}

async function main(){
    await createPost();
    await deletePost();
    await findPosts();
    await findPost();
    await updatePost();
    await createPosts();
}

main().then(() => {
    prisma.$disconnect()
}).catch((err) => {
    console.log(err)
    prisma.$disconnect()
})