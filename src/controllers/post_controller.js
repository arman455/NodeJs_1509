"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("../services/post_service"));
const moment_1 = __importDefault(require("moment"));
function getDateController(req, res) {
    const context = {
        time: (0, moment_1.default)().format("YYYY/MM/DD  HH:mm:ss")
    };
    res.render('posts', context);
}
function allPostsController(req, res) {
    // res.sendFile(path.join(__dirname, './templates/posts.html'));
    const max = Number(req.query.max);
    const context = post_service_1.default.allPosts(max);
    res.render('posts', context);
}
function createPostController(req, res) {
    const data = req.body;
    post_service_1.default.createPost(data);
    res.send("okay");
}
function getPostByIdController(req, res) {
    // res.sendFile(path.join(__dirname, './templates/posts.html'));
    const id = Number(req.params.id);
    const data = post_service_1.default.getPostById(id);
    if (id > 0 && id <= data.length) {
        res.render('post', data.context);
    }
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
    }
}
const post_controller = {
    allPosts: allPostsController,
    createPost: createPostController,
    getPostById: getPostByIdController,
    getDate: getDateController
};
exports.default = post_controller;
