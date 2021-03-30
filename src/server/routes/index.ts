import express, { Router } from 'express';
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
import auth from './auth';
import cors from 'cors';
import ArtistController from '../controllers/artist.controller';
import TagController from '../controllers/tag.controller';
import UserController from '../controllers/user.controller';

export default (app, passport, settings) => {
    const router = Router();

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        // res.header('Content-Type', 'text/plain')
        next();
    });
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    // app.get('*', isAuth);
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.static(path.join(__dirname, "../public")));
    //////////////////////////// AUTH ROUTES
    const authRoutes = auth(passport, settings);
    app.use('/auth', authRoutes);
    ////////////////////////////

    router.get('/roster/all', ArtistController.getFullRoster);
    router.post('/roster/new', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'photo_uri', maxCount: 1 }]), ArtistController.addArtist);
    router.get('/roster/new-lead-model', passport.authenticate('jwt', { session: false }), ArtistController.getNewLeadModel);
    router.post('/roster/favorite', ArtistController.favoriteArtist);
    router.post('/roster/unfavorite', ArtistController.unfavoriteArtist);
    router.get('/roster/relationships/:artistName', ArtistController.getRelationships)
    router.get('/roster/:artistName', ArtistController.getByName);
    router.put('/roster/:artistId', ArtistController.updateArtist); // authenticate me

    router.get('/tags/all', TagController.getAll);

    router.get('/user/all', UserController.getAll);
    router.get('/user/current', UserController.getLoggedInUser);
    router.get('/user/relationships/:userId', UserController.getArtistRelationships);
    router.get('/user/:userId', UserController.getUser)
    router.put('/user/:userId', UserController.updateUser) // authenticate me

    ////////////////////////////
    app.use('/', router);
    app.get('*/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'),
        error => {
            if (error) {
                console.log('Error Sending html');
                res.status(500).send(error)
            }
        })
    })
}