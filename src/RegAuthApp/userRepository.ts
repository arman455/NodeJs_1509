import { Prisma, PrismaClient } from '@prisma/client';
import client from '../Client/prismaClient';

async function findUserByEmail(email: string) {
    try {
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return "Not Found";
        }
        return user;

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}

async function createUser(data: { email: string, password: string, username: string, role: string }) {
    try {
        const newUser = await client.user.create({
            data: {
                email: data.email,
                password: data.password,
                username: data.username,
                role: data.role
            }
        });
        return newUser;

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P2015'){
                console.log(err.message);
                throw err;
            }
            if (err.code == 'P20019'){
                console.log(err.message);
                throw err;
            }
        }
    }
}


const userRepository = {
    findUserByEmail: findUserByEmail,
    createUser: createUser
};

export default userRepository;
