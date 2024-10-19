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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const post_service_1 = __importDefault(require("../../src/services/post_service"));
const prisma = new client_1.PrismaClient();
function createPost() {
    return __awaiter(this, void 0, void 0, function* () {
        const time = post_service_1.default.getDate();
        const post = yield prisma.post.create({
            data: {
                name: "post1",
                author: "sema",
                description: "zxc",
                time: time
            }
        });
        console.log(post);
    });
}
function createPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield post_service_1.default.allPosts(4).posts;
        const createPosts = yield prisma.post.createMany({
            data: posts
        });
        console.log(createPosts);
    });
}
function updatePost() {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post.update({
            where: {
                id: 1
            },
            data: {
                name: 'Updated Product!'
            }
        });
        console.log(post);
    });
}
function findPost() {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post.findUnique({
            where: {
                id: 2
            }
        });
        console.log(post);
    });
}
function findPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post.findMany();
        console.log(post);
    });
}
function deletePost() {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post.delete({
            where: {
                id: 2
            }
        });
        console.log(post);
    });
}
function findPostToComents() {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post.findUnique({
            where: {
                id: 1
            },
            include: {
                Coment: true
            }
        });
        console.log(post);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createPost();
        yield deletePost();
        yield findPosts();
        yield findPost();
        yield updatePost();
        yield createPosts();
    });
}
main().then(() => {
    prisma.$disconnect();
}).catch((err) => {
    console.log(err);
    prisma.$disconnect();
});
