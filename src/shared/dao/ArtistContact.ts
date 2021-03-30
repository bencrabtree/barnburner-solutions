import { Entity, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, PrimaryColumn, Column } from "typeorm";
import { Artist, Contact } from ".";
import { ArtistContactRelation } from "../util/types";

@Entity()
export class ArtistContact extends BaseEntity {

    @PrimaryColumn({ type: "uuid" })
    a_id: string;

    @PrimaryColumn({ type: "uuid" })
    c_id: string;

    @ManyToOne(type => Artist, artist => artist.id)
    @JoinColumn({ name: "a_id" })
    public artist!: Artist;

    @ManyToOne(type => Contact, contact => contact.id)
    @JoinColumn({ name: "c_id" })
    public contact!: Contact;

    @Column({ type: "enum", enum: ArtistContactRelation, default: ArtistContactRelation.Other })
    relation: ArtistContactRelation;
}
