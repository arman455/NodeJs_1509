import userRepository from "./userRepository";

async function login(email: string, password: string) {

    const user = await userRepository.findUserByEmail(email);

    if (user === undefined) {
        return null;
    }

    if (user === "Not Found") {
        return null;
    }

    if (password == user.password) {
        const newUser = {
            password: user.password
        }
    } else {
        return null;
    }
}

async function register(email: string, password: string) {

    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser && existingUser !== "Not Found") {
        return "User exists";
    }

    if (existingUser === "Not Found") {
        const newUserData = {
            email: email,
            password: password, 
            role: 'user',       
            username: 'user'
        };

        const newUser = await userRepository.createUser(newUserData);
        return newUser;
    }

}


const userService =  {
    login: login,
    register: register
};

export default userService;