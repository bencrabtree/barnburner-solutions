import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, getRepository, ManyToMany, OneToOne, JoinColumn } from "typeorm";
import { File } from ".";
import { UserRole } from "../util/types";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("character varying")
    first_name: string;

    @Column("character varying")
    last_name: string;

    @Column("character varying")
    email: string;

    @Column("character varying", { nullable: true })
    phone: string;

    @OneToOne(type => File, { nullable: true, cascade: true })
    @JoinColumn({ name: "photo_id" })
    photo: File;

    @Column({ type: "enum", enum: UserRole, default: UserRole.Regular })
    role: UserRole;

    @Column("character varying", { nullable: true })
    title: string;

    @Column("timestamp without time zone", { default: new Date() })
    last_login: Date;
}
