import { Request, Response } from 'express';
import { User } from '../../shared/dao';
import { userService } from '../services/user.service';

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
    getLoggedInUser
}