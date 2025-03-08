import { Prisma } from '@prisma/client';
import client from '../Client/prismaClient';

async function findTags() {
    try {
        const tags = await client.tags.findMany({
        });
        
        return tags;

    } catch (err) {
        console.log(err);
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

const tagsRepository = {
    findTags: findTags,
};

export default tagsRepository;
