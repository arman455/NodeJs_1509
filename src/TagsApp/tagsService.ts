import { IError, ISuccess } from "../types/type";
import { Tag } from './types'
import tagsRepository from './tagsRepositiry';

async function allTags(): Promise<ISuccess<Tag[]> | IError> {
    try {
        const tags = await tagsRepository.findTags();

        if (!tags || tags.length === 0) {
            return { status: 'error', message: 'Tags not found' };
        }

        return { status: 'success', data: tags };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Internal server error' };
    }
}

const tagsService = {
    allTags,
};

export default tagsService;