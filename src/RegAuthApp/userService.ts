import { IError, ISuccess } from "../types/type";
import userRepository from "./userRepository";
import { Prisma } from "@prisma/client";
import { CreateUser, User } from './types'

async function login(email: string, password: string): Promise< ISuccess<User> | IError > {

    const user = await userRepository.findUserByEmail(email);

    if (!user){
        return { status: "error", message: "User not found"};
    }
    if (user.password != password){
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

    const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
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