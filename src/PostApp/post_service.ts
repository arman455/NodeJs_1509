import postRepository from "./postRepository";
import moment from "moment";

type Post = {
    name: string;
    author: string;
    description: string;
    time: string;
};


// const posts: Post[] = [{name: "14AER280R", author: "John", description: "Життя – це низка виборів, і кожен новий день дає нам можливість рухатися вперед.", time: getDate()},
//     {name: "YE289VB31", author: "Kate", description: "Мандруй туди, де душа знаходить спокій.", time: await getDate()},
//     {name: "NT963JL65", author: "Dan", description: "Знання – це сила! Кожен день приносить нові можливості дізнатися більше і зрости.  ", time: getDate()},
//     {name: "LP754DZ26", author: "Sarbina", description: "Піклуйся про себе сьогодні, щоб завтра почуватися ще краще!  ", time: getDate()}]


async function allPosts (max: number){
    
    const context = {
        posts: await postRepository.getAllProducts() || [] // Переконайтеся, що повертається масив, навіть якщо пустий
    };
    // if (max <= posts.length){
    //     context.posts = posts.slice(0, max)
    // }
    return context

}

async function createPost(data: Post){

    const context = {
        post : await postRepository.createPost(data)
    }

    return context
}


async function getPostById(id: number) {

    const context = {
        post: await postRepository.getPostById(id)
    }

    // const post = posts[id - 1]; 
    
    // const context = {
    //     post: post, 
    // };

    // return {
    //     context: context,
    //     length: posts.length,
    // };
}

async function getDate(){
    const time = moment().format("YYYY/MM/DD  HH:mm:ss");
    return time;
}


const post_service =  {
    allPosts: allPosts,
    createPost: createPost,
    getPostById: getPostById,
    getDate: getDate };

export default post_service;