import { PrismaClient } from "@prisma/client";
import { post } from "request";


const prisma = new PrismaClient()

async function createComent(){

    const coment = await prisma.coment.create({
        data: {
            body: "zxczxczxc",
            userId: 1,
            title: "Coment1",
            image: "https://gas-kvas.com/uploads/posts/2023-01/1673411839_gas-kvas-com-p-anime-risunki-dead-inside-3.jpg",
            postid: 1
        }
    })
    console.log(coment)
}

async function createComents(){

    const coments = await prisma.coment.createMany({
        data: [
            {
                userId: 1,
                body: "qwerty",
                title: "Coment2",
                image: "https://www.meme-arsenal.com/memes/262dcc2f4e9d11500a0a0d7db224e11c.jpg",
                postid: 1
            },
            {
                userId: 1,
                body: "Пищи нет вкуснее каши, старий бог...",
                title: "Coment3",
                image: "https://www.meme-arsenal.com/memes/262dcc2f4e9d11500a0a0d7db224e11c.jpg",
                postid: 1
            }

        ]
    })
    console.log(coments)
}

async function deleteComent() {
    const coment = await prisma.coment.delete({
        where: {
            id: 8
        }
    })
    console.log(coment)
}

async function findComent() {
    const coment = await prisma.coment.findUnique({
        where: {
            id: 11
        }
    })
    console.log(coment)
}

async function findComentDetal() {
    const coment = await prisma.coment.findUnique({
        where: {
            id: 11
        }
    })
    const post = await prisma.post.findUnique({
        where: {
            id: coment?.postid
        },

        include: {
            Coment: true
        }
    })
}

async function updateComent() {

    const coment = await prisma.coment.update({
        where: {
            id: 8
        },

        data: {
            body: 'Updated Coment!'
        }
    })
    console.log(coment)
}

async function main(){
    // await createComent();
    await createComents();
    // await deleteComent();
    // await findComent();
    // await findComentDetal();
    // await updateComent();
}

main().then(() => {
    prisma.$disconnect()
}).catch((err) => {
    console.log(err)
    prisma.$disconnect()
})
