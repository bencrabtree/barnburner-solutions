import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, OneToOne, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn, JoinColumn, TableForeignKey, AfterInsert } from "typeorm";
import { ArtistContact, Contact, File, Tag, User, UserArtist } from '.';
import { ArtistStatus } from "../util/types";

@Entity()
export class Artist extends BaseEntity {

    constructor(params?) {
        super();

        if (params) {
            this.full_name = params.full_name.trim();
            this.status = params.status?.trim();
            this.photo = params.photo;
            this.description = params.description?.trim();
            this.website = params.website?.trim();
            this.twitter = params.twitter?.trim();
            this.facebook = params.facebook?.trim();
            this.apple_music = params.apple_music?.trim();
            this.spotify = params.spotify?.trim();
            this.snapchat = params.snapchat?.trim();
            this.instagram = params.instagram?.trim();
            this.soundcloud = params.soundcloud?.trim();
            this.tiktok = params.tiktok?.trim();
            this.youtube = params.youtube?.trim();
            this.tags = params.tags.split(',');
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: "character varying" })
    full_name: string;

    @Column({ nullable: false, type: "enum", enum: ArtistStatus, default: ArtistStatus.New })
    status: string;

    @ManyToOne(type => File, file => file.artist, { onDelete: 'CASCADE' })
    photo: File;

    @Column({ nullable: true, type: "character varying" })
    description: string;

    @CreateDateColumn({type: "timestamp without time zone"})
    created_on: Date;

    @UpdateDateColumn({ type: "timestamp without time zone"})
    updated_on: Date;

    ///

    @Column({ nullable: true, type: "character varying" })
    website: string;

    @Column({ nullable: true, type: "character varying" })
    twitter: string;

    @Column({ nullable: true, type: "character varying" })
    instagram: string;

    @Column({ nullable: true, type: "character varying" })
    facebook: string;

    @Column({ nullable: true, type: "character varying" })
    snapchat: string;

    @Column({ nullable: true, type: "character varying" })
    spotify: string;

    @Column({ nullable: true, type: "character varying" })
    apple_music: string;

    @Column({ nullable: true, type: "character varying" })
    soundcloud: string;

    @Column({ nullable: true, type: "character varying" })
    tiktok: string;

    @Column({ nullable: true, type: "character varying" })
    youtube: string;

    ////

    @OneToMany(type => File, file => file.artist, {
        cascade: true
    })
    files: File[];

    // @ManyToMany(type => Tag)
    // @JoinTable({ name: "artist_tags" })
    @Column({ array: true, type: "character varying" })
    tags: string[];

    ///

    @AfterInsert()
    async uploadPhoto() {

    }

    ////

    toEditableArray() {
        const values = Object.keys(this);
        return values.map(val => ({
            id: val,
            data: this[val] || ""
        }));
    }

    getSocial() {
        return {
            website: this.website,
            spotify: this.spotify,
            apple_music: this.apple_music,
            soundcloud: this.soundcloud,
            youtube: this.youtube,
            twitter: this.twitter,
            instagram: this.instagram,
            facebook: this.facebook,
            snapchat: this.snapchat,
            tiktok: this.tiktok
        }
    }
}
