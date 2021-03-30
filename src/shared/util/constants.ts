import { ArtistStatus } from "./types";

export const getLabel = {
    full_name: 'Full Name',
    manager_name: 'Manager Name',
    manager_email: 'Manager Email',
    manager_phone: 'Manager Phone',
    account_owners: 'Account Owners',
    description: 'Artist Description',
    website: 'Website',
    twitter: 'Twitter',
    instagram: 'Instagram',
    facebook: 'Facebook',
    snapchat: 'Snapchat',
    spotify: 'Spotify',
    apple_music: 'Apple Music',
    soundcloud: 'SoundCloud',
    tiktok: 'TikTok',
    youtube: 'Youtube'
};

export const getSocial = [
    "website",
    "spotify",
    "apple_music",
    "soundcloud",
    "youtube",
    "twitter",
    "instagram",
    "facebook",
    "snapchat",
    "tiktok",
];

export const clientStatus = [
    { id: ArtistStatus.New, label: ArtistStatus.New },
    { id: ArtistStatus.Approached, label: ArtistStatus.Approached },
    { id: ArtistStatus.Negotiating, label: ArtistStatus.Negotiating },
    { id: ArtistStatus.Signed, label: ArtistStatus.Signed }
]