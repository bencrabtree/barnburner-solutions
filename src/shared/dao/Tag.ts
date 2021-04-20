import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Artist, User } from ".";

@Entity()
export class Tag extends BaseEntity {
    
    constructor(name) {
        super();
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    @ManyToMany(type => Artist, artist => artist.tags)
    id: number;

    @Column("character varying")
    name: string;
}
