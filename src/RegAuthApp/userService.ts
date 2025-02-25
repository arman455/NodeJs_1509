import { IError, ISuccess } from "../types/type";
import userRepository from "./userRepository";
import { CreateUser, User } from './types'
import bcryptjs from 'bcryptjs';

async function login(email: string, password: string): Promise< ISuccess<User> | IError > {

    const user = await userRepository.findUserByEmail(email);

    if (!user){
        return { status: "error", message: "User not found"};
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
        return { status: "error", message: "Password is incorrect" };
    }

    return { status: "success", data: user};

}

async function register(data: CreateUser): Promise< IError | ISuccess<User>>{

    const user = await userRepository.findUserByEmail(data.email)
    console.log(user);

    if (user) {
        return { status: "error", message: "User exists!"};
    }

    const hashedPassword = await bcryptjs.hash(data.password, 10);

    const userData = {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: "user"
    }

    const newUser = await userRepository.createUser(userData);

    if (!newUser) {
        return { status: "error", message: "User not create!"};
    }

    return { status: "success", data: newUser};

}


const userService =  {
    login: login,
    register: register
};

export default userService;