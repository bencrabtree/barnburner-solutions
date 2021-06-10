
export class User {

    constructor(
        email,
        full_name,
        photo_uri,
        last_login=new Date(),
        phone="N/A",
        role="N/A",
        title="N/A"
    ) {
       this.email = email;
       this.full_name = full_name;
       this.photo_uri = photo_uri;
       this.last_login = last_login;
       this.phone = phone;
       this.role = role;
       this.title = title;
    }

    id: number;
    full_name: string;
    email: string;
    last_login;
    phone: string;
    photo_uri: string;
    role: string;
    title: string;
}
