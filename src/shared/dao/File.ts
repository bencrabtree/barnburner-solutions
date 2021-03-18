import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Tag } from ".";

@Entity()
export class File extends BaseEntity {

    constructor(file_path, alt_text?) {
        super();

        this.file_path = file_path;
        this.alt_text = alt_text || "";
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying")
    alt_text: string;

    @Column("timestamp without time zone")
    upload_date;

    @Column("character varying", { nullable: true, array: true })
    @OneToMany(type => Tag, tag => tag.name)
    tags: number[];

    @Column("character varying")
    file_path: string;
}
