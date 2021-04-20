import { Request, Response } from "express";
import { useImperativeHandle } from "react";
const request = require('request-promise')
import { getConnection, getRepository } from "typeorm";
import { User, File, UserArtist, Artist } from "../../shared/dao";
import { FileTypes, UserArtistRelation, UserRole } from "../../shared/util/types";
const jwt = require("jsonwebtoken");

class UserService {
    constructor() {}

    //
    getAll = async (): Promise<User[]> => {
        try {
            return await getRepository(User).find();
        } catch (error) {
            console.log("[UserService] getAll:", error)
        }
    }

    getLoggedInUser = async (req: Request): Promise<User> => {
        try {
            if (req.cookies.token) {
                const decrypt = await jwt.verify(req.cookies.token, "my-secret-key");
                let user: User = await getRepository(User)
                    .createQueryBuilder('user')
                    .where({ email: decrypt.email })
                    .leftJoinAndSelect('user.photo', 'photo')
                    .getOne();
                return user;
            }
            return null;
        } catch (error) {
            console.log("[UserService] getLoggedInUser:", error)
        }
    }

    getUser = async (id: string): Promise<User> => {
        try {
            let user: User = await getRepository(User)
                .createQueryBuilder('user')
                .where({ id })
                .leftJoinAndSelect('user.photo', 'photo')
                .getOne();
            return user;
        } catch (error) {
            console.log("[UserService] getUser:", error);
        }
    }

    //
    getUserByEmail = async (email: string): Promise<User> => {
        try {
            let user: User = await getRepository(User)
                .createQueryBuilder('user')
                .where({ email })
                .getOne();
            return user;
        } catch (err) {
            console.log("[UserService] getUserByEmail:", err)
        }
    }

    //
    getUserById = async (id: string): Promise<User> => {
        try {
            let user: User = await getRepository(User).findOne(id);
            return user;
        } catch (err) {
            console.log("[UserService] getUserById:", err)
        }
    }

    //
    createUser = async (email: string, first_name: string, last_name: string, photo_uri: string, role: UserRole = UserRole.Regular) => {
        try {
            let user = new User();
            let photo = new File();

            let response = await request({
                uri: photo_uri,
                encoding: null
            });
            await photo.uploadUserPhoto(response, email);

            photo.type = FileTypes.Jpg;
            user.photo = photo;
            user.email = email;
            user.first_name = first_name;
            user.last_name = last_name;
            user.role = role;
            await getConnection().manager.save(user);
            return user;

        } catch (error) {
            console.log("[UserService] createUser:", error)
        }
    }

    //
    updateUser = async (id: string, updates: object) => {
        let user: User = await getConnection()
                .getRepository(User)
                .createQueryBuilder("user")
                .update<User>(User, { ...updates })
                .where({ id })
                .returning("*")
                .updateEntity(true)
                .execute().then(res => res.raw[0]);
        return user;
    }

    //
    getArtistRelationships = async (userId: string) => {
        const artists: Artist[] = await getRepository(UserArtist)
            .createQueryBuilder('ua')
            .leftJoinAndSelect('ua.artist', 'artist')
            .leftJoinAndSelect('artist.photo', 'photo')
            .where("ua.u_id = :userId", { userId })
            .andWhere("artist.id = ua.a_id")
            .select("artist.id as id, ua.relation, artist.full_name, artist.status, artist.tags, artist.updated_on, photo.file_path as artist_photo")
            .execute();
        return artists;
    }
}

export const userService = new UserService();