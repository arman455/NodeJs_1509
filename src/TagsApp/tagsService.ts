import { IError, ISuccess } from "../types/type";
import { Tag } from './types'
import tagsRepository from './tagsRepositiry';

async function allTags(): Promise<ISuccess<Tag[]> | IError> {
    const tags = await tagsRepository.findTags()

    if (!tags) {
        return { status: 'error', message: 'Tags not found' }
    }

    return { status: 'success', data: tags }
}

const tagsService = {
    allTags,
};

export default tagsService;