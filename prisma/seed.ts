import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient()

async function createPost(){
    const time = getDate();
    const post = await prisma.post.create({
        data: {
            name: "S56E98M1EN", 
            author: "Sema", 
            description: "Пока я дрочу на Юлю, Старий Бог ебет бабулю.", 
            time: time, 
            userId: 2,
            tagId: 1
        }
    })
    return post;

}

async function createTag(){
    const post = await prisma.tags.create({
        data: {
            name: "Старый Бог",
        }
    })
    return post;

}

function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}

async function createUser(){
    const user = await prisma.user.create({
        data: {
            username: "sema",
            email: "sema@gmail.com",
            password: "12345678",
            role: "admin",
        }
    })
}

async function createPosts(){

    const posts = await prisma.post.createMany({
        data: [{name: "Арбуз", author: "Новый пользователь чата", description: "Я попробовал арбуз, а Старий Бог мой хук на вкус.", tagId: 1, time: getDate(), userId: 1},
            {name: "Пища", author: "Новый пользователь чата", description: "Пищи нет вкуснее каши, Старий Бог синок параши.", tagId: 1, time: getDate(), userId: 1},
            {name: "Че парни..", author: "Stariy", description: "Че парни, неделю не играл, норм играю?? ОТВЕЧААААЙТЕ мне!!", tagId: 2, time: getDate(), userId: 1},
            {name: "Ферма", author: "Новый пользователь чата", description: "Сегодня мер разрушил ферму, Старий Бог глотает..", tagId: 1, time: getDate(), userId: 1}]}
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
    // await createUser;
    // await createPost();
    // await deletePost();
    // await findPosts();
    // await findPost();
    // await updatePost();
    await createPosts();
    // await createTag();
}

main().then(() => {
    prisma.$disconnect()
}).catch((err) => {
    console.log(err)
    prisma.$disconnect()
})