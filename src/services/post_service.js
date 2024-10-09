const moment = require("moment");

const posts = [{name: "14AER280R", author: "John", description: "Життя – це низка виборів, і кожен новий день дає нам можливість рухатися вперед.", time: getDate()},
    {name: "YE289VB31", author: "Kate", description: "Мандруй туди, де душа знаходить спокій.", time: getDate()},
    {name: "NT963JL65", author: "Dan", description: "Знання – це сила! Кожен день приносить нові можливості дізнатися більше і зрости.  ", time: getDate()},
    {name: "LP754DZ26", author: "Sarbina", description: "Піклуйся про себе сьогодні, щоб завтра почуватися ще краще!  ", time: getDate()}]


function allPosts (max){
    
    const context = {
        posts: posts
    }
    if (max <= posts.length){
        context.posts = posts.slice(0, max)
    }
    return context

}

function createPost(data){

    posts.push(data)

}

function getPostById(id){

    const context = {
        post: posts[id-1]
    }

    return {
        context: context,
        length: posts.length
    }

}

function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}


module.exports = {
    allPosts: allPosts,
    createPost: createPost,
    getPostById: getPostById,
    getDate: getDate
}