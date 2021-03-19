import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User, Client, Lead } from "../../shared/dao";
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
                let user: User = await getRepository(User).findOne({ email: decrypt.email });
                return user;
            }
            return null;
        } catch (error) {
            console.log("[UserService] getLoggedInUser:", error)
        }
    }

    //
    getUserByEmail = async (email: string): Promise<User> => {
        try {
            let user: User = await getRepository(User).findOne({ email });
            return user;
        } catch (err) {
            console.log("[UserService] getUserByEmail:", err)
        }
    }

    //
    getUserById = async (id: number): Promise<User> => {
        try {
            let user: User = await getRepository(User).findOne(id);
            return user;
        } catch (err) {
            console.log("[UserService] getUserById:", err)
        }
    }

    //
    createUser = async (email: string, first_name: string, last_name: string, photo_uri: string) => {
        try {
            let user = new User(email, first_name, last_name, photo_uri);
            await getRepository(User).save(user);
            return user;
        } catch (error) {
            console.log("[UserService] createUser:", error)
        }
    }

    //
    updateUser = async (email: string, updates: object) => {
        let user: User = await this.getUserByEmail(email);
        Object.keys(updates).forEach(id => {
            user[id] = updates[id];
        });
        await user.save();
        return user;
    }


}

export const userService = new UserService();