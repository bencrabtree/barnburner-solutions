import { getRepository } from 'typeorm';
import { Tags } from '../../shared/util/types';

class TagService {
    tags: string[];
    constructor() {
        this.tags = Tags;
    }

    //
    getAll = () => {
        try {
            let allTags = this.tags;
            return allTags;
        } catch (error) {
            console.log("TagService: GetAll:", error);
            return null;
        }
    }

    //
    createNewTags = (tag: string) => {
        try {
            this.tags.push(tag);
            return this.tags;
        } catch (error) {
            console.log('TagService: CreateNewTags:', error);
            return null;
        }
    }
}

export const tagService = new TagService();