import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Artist } from ".";

@Entity()
export class Contact extends BaseEntity {

    constructor(params?) {
        super();
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "character varying",  nullable: true })
    full_name: string;

    @Column({ type: "character varying", nullable: true })
    phone: string;

    @Column({ type: "character varying", nullable: true })
    email: string;

    @Column({ type: "character varying", nullable: true, })
    address: string;

    @Column("character varying", { nullable: true })
    title: string;

    @Column("character varying", { nullable: true })
    company: string;

    @Column("character varying", { nullable: true })
    alt_phone: string;

    @Column("character varying", { nullable: true })
    notes: string;
}
