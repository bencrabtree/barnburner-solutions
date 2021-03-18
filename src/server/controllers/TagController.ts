import { Request, Response } from 'express';
import { Tag } from '../../shared/dao';
import { tagService } from '../services/tag.service';

const getAll = async (req: Request, res: Response) => {
    try {
        let allTags = await tagService.getAll();
        res.status(200).send(allTags);
    } catch (error) {
        console.log("TagController: GetAll:", error);
        res.status(400).send("Unable to get all tags")
    }
}

const createNewTags = async (req: Request, res: Response) => {
    try {
        let tag = await tagService.createNewTags(req.body.tagList);
        res.status(200).send(tag);
    } catch (error) {
        console.log("TagController: CreateNewTags:", error);
        res.status(400).send("Unable to create new tags")
    }
}

export default {
    getAll,
    createNewTags
}