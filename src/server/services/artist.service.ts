import { File, Artist, UserArtist, User } from "../../shared/dao";
import { getConnection, getRepository } from "typeorm";
import { UserArtistRelation } from "../../shared/util/types";
import { userService } from "./user.service";
import { fileService } from "./file.service";

class ArtistService {
    constructor() {}

    //
    getAll = async (): Promise<Artist[]> => {
        try {
            let roster = await getRepository(Artist)
            .find({ relations: ['photo', 'files'] });
            return roster.sort((a, b) => a.full_name.toLowerCase() < b.full_name.toLowerCase() ? -1 : 1);
        } catch (error) {
            console.log("[ArtistService] GetAll:", error);
            return null;
        }
    }

    //
    getArtistById = async (id: string): Promise<Artist> => {
        try {
            let artist: Artist = await getConnection()
                .getRepository(Artist)
                .createQueryBuilder('artist')
                .where({ id })
                .leftJoinAndSelect('artist.photo', 'photo')
                .leftJoinAndSelect('artist.files', 'files')
                // .leftJoinAndSelect('artist.tags', 'tags')
                .getOne();
            return artist;
        } catch (error) {
            console.log("[ArtistService] GetArtistById:", error);
            return null;
        }
    }

    //
    getArtistByName = async (full_name: string): Promise<Artist> => {
        try {
            console.log(full_name)
            let artist: Artist = await getRepository(Artist)
                .createQueryBuilder('artist')
                .where({ full_name })
                .leftJoinAndSelect('artist.photo', 'photo')
                .leftJoinAndSelect('artist.files', 'files')
                // .leftJoinAndSelect('artist.tags', 'tags')
                .getOne();
            console.log(artist)
            return artist;
        } catch (error) {
            console.log("[ArtistService] GetArtistByName:", error);
            return null;
        }
    }

    //
    removeArtistById = async (id: string): Promise<void> => {
        try {
            let artist = await getRepository(Artist).findOne(id);
            await getRepository(Artist).remove(artist);
        } catch (error) {
            console.log("[ArtistService] RemoveArtistById:", error);
            return null;
        }
    }

    //
    addArtist = async (data: Partial<Artist>, photo_uri: object[]): Promise<Artist> => {
        try {
            let artist = new Artist(data);
            let photo = new File();

            await photo.upload(photo_uri[0], data.full_name);
            artist.photo = photo;
            await getConnection().manager.save(artist);
            return artist;
        } catch (error) {
            console.log("[ArtistService] AddArtist:", error);
            return null;
        }
    }

    //
    uploadPhoto = async (artistId: string, photo_uri: object[]): Promise<Artist> => {
        try {
            let artist: Artist = await this.getArtistById(artistId);
            try {
                await fileService.deletePhoto(artist.photo.id, artist.full_name);
                // console.log('successfully removed photo')
            } catch (err) {
                console.log('Could not remove photo from', artist.full_name)
            }

            let photo = new File();
            await photo.upload(photo_uri[0], artist.full_name);
            console.log('successfully uploaded photo', photo)
            artist.photo = photo;
            await artist.save();
            console.log('successfully updated photo', artist)
            return artist;
        } catch (error) {
            console.log('[ArtistService] UploadPhoto:', error);
            return null;
        }
    }

    //
    updateArtist = async (id: string, updates: Artist): Promise<Artist> => {
        try {                
            let x = await this.getArtistById(id);
            Object.assign(x, updates);
            await x.save()
            return x;
        } catch (error) {
            console.log("[ArtistService] UpdateArtist:", error)
        }
    }

    //
    getModel = async () => {
        try {
            let artistModel = new Artist();
            return artistModel.toEditableArray()
        } catch (error) {
            console.log("[ArtistService] GetModel:", error);
            return null;
        }
    }

    //
    updateRelationship = async (a_id: string, u_id: string, relationship: UserArtistRelation): Promise<Artist[]> => {
        try {
            let connection = new UserArtist();
            connection.a_id = a_id;
            connection.u_id = u_id;
            connection.relation = relationship;
            await getConnection().manager.save(connection);
            return await userService.getArtistRelationships(u_id);
        } catch (error) {
            console.log("[ArtistService] UnfollowArtist:", error);
        }
    }

    //
    getRelationships = async (artistName: string): Promise<User[]> => {
        try {
            let users: User[] = await getRepository(UserArtist)
                .createQueryBuilder('ua')
                .leftJoinAndSelect('ua.user', 'user')
                .leftJoin("ua.artist", "artist")
                .leftJoinAndSelect('user.photo', 'photo')
                .andWhere("artist.full_name = :artistName", { artistName })
                .andWhere("ua.a_id = artist.id")
                .andWhere("ua.relation = :fav OR ua.relation = :owner", { fav: UserArtistRelation.Favorited, owner: UserArtistRelation.Owner })
                .select("user.id, user.email, photo.file_path as user_photo, user.first_name, user.last_name, user.role, artist.full_name as artist_name, artist.tags, ua.relation")
                .execute();
            return users;
        } catch (error) {
            console.log("[ArtistService] getRelationships:", error)
        }
    }
}

export const artistService = new ArtistService();