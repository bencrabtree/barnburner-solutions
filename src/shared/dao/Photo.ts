import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, OneToOne } from "typeorm";
import { Client, Tag } from ".";

@Entity()
export class Photo extends BaseEntity {

    constructor(key, client_id?, alt_text?) {
        super();

        this.key = key;
        this.client_id = client_id;
        this.alt_text = alt_text || "";
        this.upload_date = new Date();
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer")
    @OneToOne(type => Client, client => client.id)
    client_id: number;

    @Column("character varying")
    key: string;

    @Column("character varying")
    alt_text: string;

    @Column("timestamp without time zone")
    upload_date;

    @Column("character varying", { nullable: true, array: true })
    @OneToMany(type => Tag, tag => tag.name)
    tags: number[];
}
