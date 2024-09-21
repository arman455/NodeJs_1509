const moment = require("moment");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;
const HOST = 'localhost';

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