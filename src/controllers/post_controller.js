const post_service = require("../services/post_service");
const moment = require("moment");

function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}

function allPosts(req, res) {

    // res.sendFile(path.join(__dirname, './templates/posts.html'));

    const context = post_service.allPosts();
    res.render('posts', context);

}

function createPost (req, res) {
    const data = req.body;
    post_service.createPost(data);
    res.send("okay");
}

function getPostById (req, res) {

    // res.sendFile(path.join(__dirname, './templates/posts.html'));
    const id = req.params.id;
    const data = post_service.getPostById(id);
    if (id > 0 && id <= data.length){
        res.render('post', data.context)}
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
    }}

module.exports = {
    createPost: createPost,
    allPosts: allPosts,
    getPostById: getPostById,
    getDate: getDate
}