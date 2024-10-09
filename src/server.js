const express = require("express");
const path = require("path");
const { time } = require("console");
const moment = require("moment");

const app = express();
const PORT = 8000;
const HOST = 'localhost';
const post_router = require('./routers/post_router');

app.use('/post/', post_router);

app.set('view engine', 'ejs');
app.use(express.json());

app.set('views', path.join(__dirname, 'templates'))

app.use('/static/', express.static(path.join(__dirname, 'static')));

// res.sendFile(path.resolve(__dirname, './templates/posts.ejs'));

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/users.html"));
})

app.use("/static/",express.static(path.join(__dirname, 'static/')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './templates/index.html'));
})

function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}

app.get('/date', (req, res) => {
    res.sendFile(path.join(__dirname, './templates/date.html'));
    console.log(getDate());
})

app.listen(PORT, HOST, () =>{
    console.log("server is running")
})

// console.log(getDate());