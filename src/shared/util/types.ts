export enum ArtistStatus {
    New = "New",
    Approached = "Approached",
    Negotiating = "Negotiating",
    Signed = "Signed",
    Archived = "Archived",
    Lost = "Lost"
}

export enum UserArtistRelation {
    Admin = "admin",
    Owner = "owner",
    Favorited = "favorited",
    None = "none"
}

export enum ArtistContactRelation {
    Primary = "primary",
    Secondary = "secondary",
    Other = "other"
}

export enum UserRole {
    SuperAdmin = "superadmin",
    Administrator = "administrator",
    Regular = "regular"
}

export enum FileTypes {
    Pdf = "pdf",
    Doc = "doc",
    Excel = "excel",
    Jpg = "image/jpeg",
    Png = "image/png",
    Svg = "image/svg",
    Other = "other"
}

export const Tags = [
    "Alt Rock",											
    "Americana",											
    "Bluegrass",											
    "Blues",											
    "Classical",											
    "Conscious",											
    "Contemporary Jazz",											
    "Country",											
    "Electronic",											
    "Female-fronted",										
    "Folk",											
    "Funk",											
    "Gospel",											
    "Heritage",											
    "Indie Rock",										
    "Jam",											
    "Jazz",											
    "Latin",											
    "LGBTQ-Friendly",										
    "Orchestra/Symphony",										
    "PACS",											
    "Pop",											
    "Rap",											
    "R&B",										
    "Reggae",											
    "Rock",											
    "Singer-Songwriter",											
    "Soul"
]