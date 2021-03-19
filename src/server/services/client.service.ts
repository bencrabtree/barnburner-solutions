import { User, Client, Lead } from "../../shared/dao";
import { getRepository } from "typeorm";
import { fileService } from "./file.service";
import { Photo } from "../../shared/dao";

class ClientService {
    constructor() {}

    //
    getAll = async (): Promise<Client[]> => {
        try {
            let roster = await getRepository(Client).find();
            return roster;
        } catch (error) {
            console.log("[ClientService] GetAll:", error);
            return null;
        }
    }

    //
    getClientById = async (id: number): Promise<Client> => {
        try {
            let client = await getRepository(Client).findOne(id);
            return client;
        } catch (error) {
            console.log("[ClientService] GetClientById:", error);
            return null;
        }
    }

    //
    getClientByName = async (fullName: string): Promise<Client> => {
        try {
            let client = await getRepository(Client).findOne({ full_name: fullName });
            return client;
        } catch (error) {
            console.log("[ClientService] GetClientByName:", error);
            return null;
        }
    }

    //
    removeClientById = async (id: number): Promise<void> => {
        try {
            let client = await getRepository(Client).findOne(id);
            await getRepository(Client).remove(client);
        } catch (error) {
            console.log("[ClientService] RemoveClientById:", error);
            return null;
        }
    }

    //
    addClient = async (client: Client, photo_uri: object[]): Promise<Client> => {
        try {
            let uri = await fileService.uploadPhoto(photo_uri[0], client.full_name);
            let artistPhoto = new Photo(uri);
            let clientToAdd = new Client(client);
            clientToAdd.photo_uri = artistPhoto.key;
            let newClient = await getRepository(Client).save(clientToAdd);
            artistPhoto.client_id = newClient.id;
            await getRepository(Photo).save(artistPhoto);
            return newClient;
        } catch (error) {
            console.log("[ClientService] AddClient:", error);
            return null;
        }
    }

    //
    updateClient = async (full_name: string, updates: object): Promise<Client> => {
        try {
            let client: Client = await this.getClientByName(full_name);
            Object.keys(updates).forEach(update => {
                client[update] = updates[update];
            });
            await getRepository(Client).save(client);
            return client;
        } catch (error) {
            console.log("[ClientService] UpdateClient:", error)
        }
    }

    //
    getModel = async () => {
        try {
            let clientModel = new Client();
            return clientModel.toEditableArray()
        } catch (error) {
            console.log("[ClientService] GetModel:", error);
            return null;
        }
    }
}

export const clientService = new ClientService();