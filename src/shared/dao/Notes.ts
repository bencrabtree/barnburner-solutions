import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from ".";
import { Lead } from "./Lead";

@Entity()
export class Notes extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer")
    @ManyToOne(type => Lead, lead => lead.id)
    lead_id: number;

    @Column("integer")
    @ManyToOne(type => User, user => user.id)
    created_by: number;

    @Column("timestamp without time zone")
    created_on;

    @Column("character varying")
    content: string;
}
