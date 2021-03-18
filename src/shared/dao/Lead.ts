import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { User } from ".";
import { LeadStatus } from "../util/types";

@Entity()
export class Lead extends BaseEntity {

    constructor(client_id: number, agents: string[]) {
        super();

        this.client_id = client_id;
        this.agents = agents;
        this.updated_by = agents?.[0];
        this.created_on = new Date();
        this.updated_on = new Date();
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer")
    client_id: number;

    @Column("integer", { array: true })
    @OneToMany(type => User, user => user.email)
    agents: string[];

    @Column("character varying")
    status: LeadStatus;

    @Column("timestamp without time zone")
    created_on: Date;

    @Column("timestamp without time zone")
    updated_on: Date;

    @Column("integer")
    @ManyToOne(type => User, user => user.email)
    updated_by: string;

    updateStatus(status, update_email) {
        this.updated_by = update_email;
        this.status = status;
        this.updated_on = new Date();
        this.save();
    }

    addAgent(email) {
        this.agents.push(email);
        this.updated_on = new Date();
        this.save();
    }
}
