import express, { Express, Request, Response } from 'express'
import path from 'path';
import moment from "moment"
import router from './PostApp/postRouter';
import userRouter from './RegAuthApp/userRouter';
import postRouterApi from './PostApp/postRouterApi';
import commentRouterApi from './CommentsApp/commentRouterApi';
import tagsControllerApi from './TagsApp/tagsRouter';
import cors from 'cors'
import dotenv from 'dotenv'
import userRouterApi from './RegAuthApp/userRouterApi';

dotenv.config()

const app: Express = express();
const PORT = 8000;
const HOST = 'localhost';

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000']
}));


app.use('/api/post/', postRouterApi)
app.use('/api/comment/', commentRouterApi)
app.use('/api/tags/', tagsControllerApi)
app.use('/api/user/', userRouterApi)

// fetch("http://localhost:8000/api/user/me", {
//     method: "GET",
//     headers: {
//         "Authorization": "Bearer "
//     }
// }).then(response => {
//     console.log(response);
// }) 

app.use('/', userRouter);

app.use('/post/', router);

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'templates'))

app.use('/static/', express.static(path.join(__dirname, 'static')));


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
