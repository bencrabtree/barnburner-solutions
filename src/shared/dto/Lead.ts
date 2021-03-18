export class Lead {

    constructor(id, client, user) {
        this.id = id;
        this.client_id = client;
        this.user_id = user;
        this.updated_by = user;
        this.created_on = new Date();
        this.updated_on = new Date();
    }

    id: number;
    client_id: number;
    user_id: number[];
    status: string;
    created_on;
    updated_on;
    updated_by: number;

    updateStatus(status, user_id) {
        this.updated_by = user_id;
        this.status = status;
        this.updated_on = new Date();
    }
}
