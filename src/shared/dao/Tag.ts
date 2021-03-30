import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { User } from ".";

@Entity()
export class Tag extends BaseEntity {
    
    constructor(name) {
        super();
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying")
    name: string;
}
