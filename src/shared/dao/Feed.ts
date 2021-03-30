import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Artist, User } from '.';

@Entity()
export class Feed extends BaseEntity {

    constructor() {
        super();
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "uuid" })
    @OneToMany(type => User, user => user.id)
    u_id: string;

    @Column({ type: "uuid" })
    @OneToMany(type => Artist, artist => artist.id)
    a_id: string;

    @Column({ type: "character varying" })
    old_value: string;

    @Column({ type: "character varying" })
    new_value: string;

    @Column({ type: "timestamp without time zone" })
    time: Date;
}
