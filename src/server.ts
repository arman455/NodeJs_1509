import express, { Express, Request, Response } from 'express'
import path from 'path';
import moment from "moment"
import postRouter from './routers/post_router';

// const express = require("express");

const app: Express = express();
const PORT = 8000;
const HOST = 'localhost';

app.use(express.json());

app.use('/post/', postRouter);

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'templates'))

app.use('/static/', express.static(path.join(__dirname, 'static')));

// res.sendFile(path.resolve(__dirname, './templates/posts.ejs'));

app.get('/users', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "./templates/users.html"));
})

app.use("/static/",express.static(path.join(__dirname, 'static/')));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './templates/index.html'));
})

function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}

app.get('/date', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './templates/date.html'));
    console.log(getDate());
})

app.listen(PORT, HOST, () =>{
    console.log("server is running")
})

// console.log(getDate());