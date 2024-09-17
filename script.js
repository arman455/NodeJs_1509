const moment = require("moment");
const express = require("express");

const app = express();
const PORT = 8000;
const HOST = 'localhost';

function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}

app.get('/date', () => {
    console.log(getDate());
})

app.listen(PORT, HOST, () =>{
    console.log("server is running")
})


// console.log(getDate());