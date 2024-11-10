import userRepository from "./userRepository";

async function login(email: string, password: string) {

    const user = await userRepository.findUserByEmail(email);

    if (user === undefined) {
        return null;
    }

    // if (user === "Not Found") {
    //     return null;
    // }

    // JWT

    if (!user){
        return "error";
    }
    if (user.password != password){
        return "error";
    }
    return user;

}

async function register(email: string, password: string) {

    const existingUser = await userRepository.findUserByEmail(email);
    console.log(existingUser);

    if (existingUser && !existingUser ) {
        console.log(existingUser);
        return "User exists";
    }

    if (!existingUser) {
        const newUserData = {
            email: email,
            password: password, 
            role: 'user',       
            username: 'user'
        };

        const newUser = await userRepository.createUser(newUserData);
        return newUser;
    }
    console.log(existingUser);

}


const userService =  {
    login: login,
    register: register
};

export default userService;