import { IError, ISuccess } from "../types/type";
import userRepository from "./userRepository";
import { CreateUser, User } from './types'
import { compare, hash } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config/token";

async function login(email: string, password: string): Promise< ISuccess<string> | IError > {

    const user = await userRepository.findUserByEmail(email);

    if (!user){
        return { status: "error", message: "User not found"};
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return { status: "error", message: "Password is incorrect" };
    }

    const token = sign({id: user.id}, SECRET_KEY, { expiresIn: '1d' })

    return { status: "success", data: token};

}

async function register(data: CreateUser): Promise< IError | ISuccess<string>>{

    const user = await userRepository.findUserByEmail(data.email)

    if (user) {
        return { status: "error", message: "User exists!"};
    }

    const hashedPassword = await hash(data.password, 10);

    const userData = {
        ...data,
        password: hashedPassword,
    }

    const newUser = await userRepository.createUser(userData);

    if (!newUser) {
        return { status: "error", message: "User not create!"};
    }

    const token = sign({id: newUser.id}, SECRET_KEY, {expiresIn: '1d'})

    return { status: "success", data: token};

}
// Данные о пароле не должны идти юзеру 
async function getUserById(id: number): Promise< IError | ISuccess<User>>{
    const user = await userRepository.findUserById(id)

    if (!user) {
        return { status: "error", message: "User not found!"}
    }

    return { status: "success", data: user}
}


const userService =  {
    login: login,
    register: register,
    getUserById: getUserById
};

export default userService;