

export class Photo {

    constructor(id, file_path?, alt_text?) {
        this.id = id;
        this.file_path = file_path;
        this.alt_text = alt_text || "";
        this.upload_date = new Date();
    }

    id: number;
    alt_text: string;
    upload_date;
    tags: number[];
    file_path: string;
}
