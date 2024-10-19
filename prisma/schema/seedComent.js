"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createPost() {
    return __awaiter(this, void 0, void 0, function* () {
        const coment = yield prisma.coment.create({
            data: {
                body: "zxczxczxc",
                title: "Coment1",
                image: "https://gas-kvas.com/uploads/posts/2023-01/1673411839_gas-kvas-com-p-anime-risunki-dead-inside-3.jpg",
                postid: 1
            }
        });
        console.log(coment);
    });
}
function createComents() {
    return __awaiter(this, void 0, void 0, function* () {
        const coments = yield prisma.coment.createMany({
            data: [
                {
                    body: "qwerty",
                    title: "Coment2",
                    image: "https://www.meme-arsenal.com/memes/262dcc2f4e9d11500a0a0d7db224e11c.jpg",
                    postid: 1
                },
                {
                    body: "Пищи нет вкуснее каши, старий бог...",
                    title: "Coment3",
                    image: "https://www.meme-arsenal.com/memes/262dcc2f4e9d11500a0a0d7db224e11c.jpg",
                    postid: 1
                }
            ]
        });
        console.log(coments);
    });
}
function deleteComent() {
    return __awaiter(this, void 0, void 0, function* () {
        const coment = yield prisma.coment.delete({
            where: {
                id: 1
            }
        });
        console.log(coment);
    });
}
function findComent() {
    return __awaiter(this, void 0, void 0, function* () {
        const coment = yield prisma.coment.findUnique({
            where: {
                id: 2
            }
        });
        console.log(coment);
    });
}
function findComentDetal() {
    return __awaiter(this, void 0, void 0, function* () {
        const coment = yield prisma.coment.findUnique({
            where: {
                id: 1
            }
        });
        const post = yield prisma.post.findUnique({
            where: {
                id: coment === null || coment === void 0 ? void 0 : coment.postid
            },
            include: {
                Coment: true
            }
        });
    });
}
function updateComent() {
    return __awaiter(this, void 0, void 0, function* () {
        const coment = yield prisma.coment.update({
            where: {
                id: 1
            },
            data: {
                body: 'Updated Coment!'
            }
        });
        console.log(coment);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createPost();
        yield createComents();
        yield deleteComent();
        yield findComent();
        yield findComentDetal();
        yield updateComent();
    });
}
main().then(() => {
    prisma.$disconnect();
}).catch((err) => {
    console.log(err);
    prisma.$disconnect();
});
