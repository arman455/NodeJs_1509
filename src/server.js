"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const moment_1 = __importDefault(require("moment"));
const post_router_1 = __importDefault(require("./routers/post_router"));
// const express = require("express");
const app = (0, express_1.default)();
const PORT = 8000;
const HOST = 'localhost';
app.use(express_1.default.json());
app.use('/post/', post_router_1.default);
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'templates'));
app.use('/static/', express_1.default.static(path_1.default.join(__dirname, 'static')));
// res.sendFile(path.resolve(__dirname, './templates/posts.ejs'));
app.get('/users', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "./templates/users.html"));
});
app.use("/static/", express_1.default.static(path_1.default.join(__dirname, 'static/')));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, './templates/index.html'));
});
function getDate() {
    const time = (0, moment_1.default)().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}
app.get('/date', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, './templates/date.html'));
    console.log(getDate());
});
app.listen(PORT, HOST, () => {
    console.log("server is running");
});
// console.log(getDate());
