const moment = require("moment");
const express = require("express");
const path = require("path");
const { time } = require("console");

const app = express();
const PORT = 8000;
const HOST = 'localhost';


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'templates'))

app.use('/static/', express.static(path.join(__dirname, 'static')));

// res.sendFile(path.resolve(__dirname, './templates/posts.ejs'));
function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}


const posts = [{name: "14AER280R", author: "John", description: "Життя – це низка виборів, і кожен новий день дає нам можливість рухатися вперед.", time: getDate()},
    {name: "YE289VB31", author: "Kate", description: "Мандруй туди, де душа знаходить спокій.", time: getDate()},
    {name: "NT963JL65", author: "Dan", description: "Знання – це сила! Кожен день приносить нові можливості дізнатися більше і зрости.  ", time: getDate()},
    {name: "LP754DZ26", author: "Sarbina", description: "Піклуйся про себе сьогодні, щоб завтра почуватися ще краще!  ", time: getDate()}]



app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/users.html"));
})

app.get('/post/:id', (req, res) =>{

    // res.sendFile(path.join(__dirname, './templates/posts.html'));

    const id = req.params.id;
    const context = {
        post: posts[id-1]
    }
    if (id > 0 && id <= posts.length){
        res.render('post', context)
    }else {
        const context = {
            message: "Такого поста не існує!",
            link: "/posts"
        };
        res.render('error', context); 
        // res.status(404).send(`  - 2 спосіб реалізації нествореного посту!!!
        //     <h1>404 - Такого поста не існує!</h1>
        //     <a href="/posts">All posts</a>
        // `);
    }

});

app.get('/posts', (req, res) =>{

    // res.sendFile(path.join(__dirname, './templates/posts.html'));

    const context = {
        posts: posts
    }
    
    res.render('posts', context);
});


app.use("/static/",express.static(path.join(__dirname, 'static/')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './templates/index.html'));
})

app.get('/date', (req, res) => {
    res.sendFile(path.join(__dirname, './templates/date.html'));
    console.log(getDate());
})

app.listen(PORT, HOST, () =>{
    console.log("server is running")
})

// console.log(getDate());