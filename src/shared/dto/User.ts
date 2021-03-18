
export class User {

    constructor(
        email,
        first_name,
        last_name,
        photo_uri,
        last_login=new Date(),
        phone="N/A",
        role="N/A",
        title="N/A"
    ) {
       this.email = email;
       this.first_name = first_name;
       this.last_name = last_name;
       this.photo_uri = photo_uri;
       this.last_login = last_login;
       this.phone = phone;
       this.role = role;
       this.title = title;
    }

    id: number;
    first_name: string;
    last_name: string;
    email: string;
    last_login;
    phone: string;
    photo_uri: string;
    role: string;
    title: string;
}
