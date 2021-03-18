import { Tag } from ".";

export class File {

    constructor(id, alt_text, upload_date, tags, file_path) {

        this.id = id;
        this.file_path = file_path;
        this.alt_text = alt_text || "";
        this.upload_date = upload_date;
        this.tags = tags;
    }

    id: number;
    alt_text: string;
    upload_date;
    tags: number[];
    file_path: string;
}
