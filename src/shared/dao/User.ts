import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, getRepository } from "typeorm";

@Entity()
export class User extends BaseEntity {

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
       super();

       this.email = email;
       this.first_name = first_name;
       this.last_name = last_name;
       this.photo_uri = photo_uri;
       this.last_login = last_login;
       this.phone = phone;
       this.role = role;
       this.title = title;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying")
    first_name: string;

    @Column("character varying")
    last_name: string;

    @Column("character varying")
    email: string;

    @Column("timestamp without time zone")
    last_login;

    @Column("character varying")
    phone: string;

    @Column("character varying")
    photo_uri: string;

    @Column("character varying")
    role: string;

    @Column("character varying")
    title: string;
}
