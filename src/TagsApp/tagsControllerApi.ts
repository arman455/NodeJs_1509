import { Request, Response } from 'express';
import tagsService from './tagsService';

async function allTagsController(req: Request, res: Response) {
    const context = await tagsService.allTags();
    if (context.status === 'error') {
        // context.message?
        res.status(500).json({ message: 'Internal server error' });
        return
    }
    res.json(context.data);
}

const tagsControllerApi = {
    allTags: allTagsController,
};

export default tagsControllerApi;