import { Entity, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, PrimaryColumn, Column } from "typeorm";
import { Artist, User } from ".";
import { ArtistContactRelation, UserArtistRelation } from "../util/types";

@Entity()
export class UserArtist extends BaseEntity {

    @PrimaryColumn({ type: "uuid" })
    a_id: string;

    @PrimaryColumn({ type: "uuid" })
    u_id: string;

    @Column({ type: "enum", enum: UserArtistRelation, default: UserArtistRelation.None })
    relation: UserArtistRelation;

    @ManyToOne(type => Artist, artist => artist.id)
    @JoinColumn({ name: "a_id" })
    public artist!: Artist;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "u_id" })
    public user!: User;

    @CreateDateColumn({type: "timestamp without time zone"})
    created_on: string;
}
