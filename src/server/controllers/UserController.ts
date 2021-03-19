import { Request, Response } from 'express';
import { User } from '../../shared/dao';
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

const getLoggedInUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getLoggedInUser(req);
        res.status(200).send(user);
    } catch (error) {
        console.log("UserController: getLoggedInUser:", error);
        res.status(400).send("Unable to get logged in user");
    }
}

export default {
    getAll,
    getLoggedInUser
}