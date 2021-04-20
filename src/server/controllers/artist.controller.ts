import { Request, Response } from 'express';
import { Artist } from '../../shared/dao';
import { UserArtistRelation } from '../../shared/util/types';
import { artistService } from '../services/artist.service';

const getFullRoster = async (req: Request, res: Response) => {
    try {
        let fullRoster = await artistService.getAll();
        res.status(200).send(fullRoster);
    } catch (error) {
        console.log("ArtistController: GetFullRoster:", error);
        res.status(400).send("Unable to get full roster");
    }
}

const addArtist = async (req: Request, res: Response) => {
    try {
        let artist = await artistService.addArtist(req.body, req.files.photo_uri);
        res.status(200).send(artist);
    } catch (error) {
        console.log("ArtistController: AddArtist:", error);
        res.status(400).send(`Unable to add ${req.body?.full_name || 'artist'}`)
    }
}

const updateArtist = async (req:Request, res: Response) => {
    try {
        let artist = await artistService.updateArtist(req.params.artistId, req.body);
        res.status(200).send(artist);
    } catch (error) {
        console.log("ArtistController: AddArtist:", error);
        res.status(400).send(`Unable to add ${req.body?.full_name || 'artist'}`)
    }
}

const getArtist = async (req: Request, res: Response) => {
    try {
        let artist = await artistService.getArtistById(req.params.artistId);
        res.status(200).send(artist);
    } catch (error) {
        console.log('ArtistController: getArtist:', error);
        res.status(400).send(`Unable to get ${req.params.artistId || 'unknown artist'}`)
    }
}

const getByName = async (req: Request, res: Response) => {
    try {
        let artist = await artistService.getArtistByName(req.params.artistName);
        res.status(200).send(artist);
    } catch (error) {
        console.log('ArtistController: GetByName:', error);
        res.status(400).send(`Unable to get ${req.params.artistName || 'unknown artist'}`)
    }
}

const getNewLeadModel = async (req: Request, res: Response) => {
    try {
        let artistModel = await artistService.getModel();
        res.status(200).send(artistModel);
    } catch (error) {
        console.log("ArtistController: GetNewLeadModel:", error);
        res.status(400).send('Unable to get new lead model');
    }
}

const favoriteArtist = async (req: Request, res: Response) => {
    try {
        let newRelationships = await artistService.updateRelationship(req.body.artistId, req.body.userId, UserArtistRelation.Favorited);
        res.status(200).send(newRelationships);
    } catch (error) {
        console.log('ArtistController: favoriteArtist:', error);
        res.status(400).send(`Unable to favorite artist ${req.body.artistId}, agent ${req.body.userId}`)
    } 
}

const unfavoriteArtist = async (req: Request, res: Response) => {
    try {
        let newRelationships = await artistService.updateRelationship(req.body.artistId, req.body.userId, UserArtistRelation.None);
        res.status(200).send(newRelationships);
    } catch (error) {
        console.log('ArtistController: unfavoriteArtist:', error);
        res.status(400).send(`Unable to unfavorite artist ${req.body.artistId}, agent ${req.body.userId}`)
    } 
}

const getRelationships = async (req: Request, res: Response) => {
    try {
        let relationships = await artistService.getRelationships(req.params.artistName);
        res.status(200).send(relationships);
    } catch (error) {
        console.log('ArtistController: getRelationships:', error);
        res.status(400).send(`Unable to get relationships for ${req.params.artistName}`)
    } 
}

const uploadPhoto = async (req: Request, res: Response) => {
    try {
        let artist = await artistService.uploadPhoto(req.params.artistId, req.files.photo_uri);
        res.status(200).send(artist);
    } catch (error) {
        console.log('ArtistController: uploadPhoto:', error);
        res.status(400).send(`Unable to upload photo for ${req.params.artistId}`)
    } 
}

export default {
    getFullRoster,
    addArtist,
    updateArtist,
    getArtist,
    getByName,
    favoriteArtist,
    unfavoriteArtist,
    getRelationships,
    getNewLeadModel,
    uploadPhoto
}