import { Request, Response } from 'express';
import { Artist } from '../../shared/dao';
import { userService } from '../services/user.service';

const getAll = async (req: Request, res: Response) => {
    try {
        let allUsers = await userService.getAll();
        res.status(200).send(allUsers);
    } catch (error) {
        console.log("UserController: getAll:", error);
        res.status(400).send('Unable to get all users');
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUser(req.params.userId);
        res.status(200).send(user);
    } catch (error) {
        console.log("UserController: getUser:", error);
        res.status(400).send("Unable to get user");
    }
}

const getLoggedInUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getLoggedInUser(req);
        res.status(200).send(user);
    } catch (error) {
        console.log("UserController: getLoggedInUser:", error);
        res.status(400).send("Unable to get logged in user");
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.updateUser(req.params.userId, req.body.updates);
        res.status(200).send(user);
    } catch (error) {
        console.log("UserController: updateUser:", error);
        res.status(400).send(`Unable to update user ${req.params.userId}`)
    }
}

const getArtistRelationships = async (req: Request, res: Response) => {
    try {
        let artists: Artist[] = await userService.getArtistRelationships(req.params.userId);
        res.status(200).send(artists);
    } catch (error) {
        console.log("UserController: updateUser:", error);
        res.status(400).send(`Unable to get relationships for user ${req.params.userId}`)
    }
}

export default {
    getAll,
    getUser,
    getLoggedInUser,
    updateUser,
    getArtistRelationships
}