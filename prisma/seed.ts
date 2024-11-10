import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient()

async function createPost(){
    const time = getDate();
    const post = await prisma.post.create({
        data: {
            name: "YE289VB31", 
            author: "Kate", 
            description: "Мандруй туди, де душа знаходить спокій.", 
            time: getDate(), 
            userId: 1
        }
    })

}

function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}

async function createUser(){
    const user = await prisma.user.create({
        data: {username: "sema",
            email: "sema@gmail.com",
            password: "12345678",
            role: "administrator",
        }
    });
}

async function createPosts(){

    const posts = await prisma.post.createMany({
        data: [{name: "14AER280R", author: "John", description: "Життя – це низка виборів, і кожен новий день дає нам можливість рухатися вперед.", time: getDate(), userId: 1},
            {name: "YE289VB31", author: "Kate", description: "Мандруй туди, де душа знаходить спокій.", time: getDate(), userId: 1},
            {name: "NT963JL65", author: "Dan", description: "Знання – це сила! Кожен день приносить нові можливості дізнатися більше і зрости.  ", time: getDate(), userId: 1},
            {name: "LP754DZ26", author: "Sarbina", description: "Піклуйся про себе сьогодні, щоб завтра почуватися ще краще!  ", time: getDate(), userId: 1}]}
    )
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
            id: 6
        }
    })
    console.log(post)
}

async function findPostToComents(){
    const post = await prisma.post.findUnique({
        where: {
            id: 1
        },
        include: {
            Coment: true
        }
    })
    console.log(post)
}

async function main(){
    // await createPost();
    await deletePost();
    await findPosts();
    await findPost();
    await updatePost();
    // await createPosts();
}

createPosts().then(() => {
    prisma.$disconnect()
}).catch((err) => {
    console.log(err)
    prisma.$disconnect()
})