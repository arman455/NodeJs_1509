import userRepository from "./userRepository";
import { Prisma } from "@prisma/client";

interface IUserError{
    status: "Error",
    message: string;
}

interface IUserSuccess{
    status: "Success",
    data: IUser;
}

interface IUser{
    id: number;
    username: string;
    email: string;
    password: string;
}


async function login(email: string, password: string): Promise< IUserError | IUserSuccess> {

    const user = await userRepository.findUserByEmail(email);

    if (!user){
        return { status: "Error", message: "User not found"};
    }
    if (user.password != password){
        return { status: "Error", message: "Password is incorrect" };
    }
    return { status: "Success", data: user};

}

async function register(data: Prisma.UserCreateInput): Promise< IUserError | IUserSuccess>{

    const user = await userRepository.findUserByEmail(data.email)
    console.log(user);

    if (user) {
        return { status: "Error", message: "User exists!"};
    }

    const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: "user"
    }

    const newUser = await userRepository.createUser(userData);

    if (!newUser) {
        return { status: "Error", message: "User not create!"};
    }

    return { status: "Success", data: newUser};

}


const userService =  {
    login: login,
    register: register
};

export default userService;