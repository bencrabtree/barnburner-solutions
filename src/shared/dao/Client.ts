import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, OneToOne, ManyToMany } from "typeorm";
import { Photo, Tag, User } from '.';

@Entity()
export class Client extends BaseEntity {

    constructor(params?) {
        super();

        this.created_on = new Date();

        if (params) {
            this.full_name = params.full_name;
            this.status = params.status;
            this.photo_uri = params.photo_uri;
            this.description = params.description;
            this.manager_name = params.manager_name;
            this.manager_email = params.manager_email;
            this.manager_phone = params.manager_phone;
            this.account_owners = params.account_owners || [];
            this.website = params.website;
            this.twitter = params.twitter;
            this.facebook = params.facebook;
            this.apple_music = params.apple_music;
            this.spotify = params.spotify;
            this.snapchat = params.snapchat;
            this.instagram = params.instagram;
            this.soundcloud = params.soundcloud;
            this.tiktok = params.tiktok;
            this.youtube = params.youtube;
            this.tags = params.tags?.split(',') || []
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "character varying" })
    full_name: string;

    @Column({ nullable: false, type: "character varying"})
    status: string;

    @Column({ nullable: true, type: "character varying" })
    @OneToOne(type => Photo, photo => photo.key)
    photo_uri: string;

    @Column({ nullable: true, type: "character varying" })
    description: string;

    @Column("timestamp without time zone", { nullable: false })
    created_on;

    @Column("timestamp without time zone", { nullable: false })
    updated_on;

    ///

    @Column({ nullable: true, type: "character varying" })
    manager_name: string;

    @Column({ nullable: true, type: "character varying" })
    manager_email: string;

    @Column({ nullable: true, type: "character varying" })
    manager_phone: string;

    @Column("character varying", { nullable: true, array: true })
    @ManyToOne(type => User, user => user.email)
    account_owners: string[];

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

    @Column("character varying", { nullable: true, array: true })
    @OneToMany(type => Tag, tag => tag.name)
    tags: string[];

    update() {
        this.updated_on = new Date();
        this.save();
        return this;
    }

    toEditableArray() {
        const values = Object.keys(this);
        return values.map(val => ({
            id: val,
            data: this[val] || ((val === 'tags' || val === 'collection') ? [] : "")
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
