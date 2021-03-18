import { Photo, Tag } from '.';

export class Client {

    constructor(params?) {

        if (params) {
            this.full_name = params.full_name;
            this.photo_uri = params.photo_uri;
            this.description = params.description;
            this.contact = params.contact;
            this.contact_email = params.contact_email;
            this.collection = params?.collection || [];
            this.description_short = params.description_short;
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
            this.tags = params?.tags || [];
        }
    }

    id: number;
    full_name: string;
    contact: string;
    contact_email: string;
    photo_uri: number;
    collection: number[] = [];
    description: string;
    description_short: string;
    website: string;
    twitter: string;
    instagram: string;
    facebook: string;
    snapchat: string;
    spotify: string;
    apple_music: string;
    soundcloud: string;
    tiktok: string;
    youtube: string;
    tags: string[] = [];

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
