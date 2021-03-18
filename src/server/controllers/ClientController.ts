import { Request, Response } from 'express';
import { Client } from '../../shared/dao';
import { clientService } from '../services/client.service';

const getFullRoster = async (req: Request, res: Response) => {
    try {
        let fullRoster = await clientService.getAll();
        res.status(200).send(fullRoster);
    } catch (error) {
        console.log("ClientController: GetFullRoster:", error);
        res.status(400).send("Unable to get full roster");
    }
}

const addClient = async (req: Request, res: Response) => {
    try {
        let client = await clientService.addClient(req.body, req.files.photo_uri);
        res.status(200).send(client);
    } catch (error) {
        console.log("ClientController: AddClient:", error);
        res.status(400).send(`Unable to add ${req.body?.full_name || 'client'}`)
    }
}

const getByName = async (req: Request, res: Response) => {
    try {
        let client = await clientService.getClientByName(req.params.artistName);
        res.status(200).send(client);
    } catch (error) {
        console.log('ClientController: GetByName:', error);
        res.status(400).send(`Unable to get ${req.params.artistName || 'unknown artist'}`)
    }
}

const getNewLeadModel = async (req: Request, res: Response) => {
    try {
        let clientModel = await clientService.getModel();
        res.status(200).send(clientModel);
    } catch (error) {
        console.log("ClientController: GetNewLeadModel:", error);
        res.status(400).send('Unable to get new lead model');
    }
}

export default {
    getFullRoster,
    addClient,
    getByName,
    getNewLeadModel
}