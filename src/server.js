const moment = require("moment");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;
const HOST = 'localhost';


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'templates'))

app.use('/static/', express.static(path.join(__dirname, 'static')));

// res.sendFile(path.resolve(__dirname, './templates/posts.ejs'));


app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/user.ejs"));
})


app.get('/post', (req, res) =>{

    // res.sendFile(path.join(__dirname, './templates/posts.html'));

    const context = {
        posts: [{name: "14AER280R", author: "John"}, {name: "YE289VB31", author: "Kate"}]
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

function getDate(){
        const time = moment().format("YYYY/MM/DD  HH:mm:ss");
        return time;
    }

// console.log(getDate());