import express, { Router } from 'express';
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
import auth from './auth';
import cors from 'cors';
import ClientController from '../controllers/ClientController';
import TagController from '../controllers/TagController';
import UserController from '../controllers/UserController';

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

    router.get('/roster/all', ClientController.getFullRoster);
    router.put('/roster/new', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'photo_uri', maxCount: 1 }]), ClientController.addClient);
    router.get('/roster/new-lead-model', passport.authenticate('jwt', { session: false }), ClientController.getNewLeadModel);
    router.get('/roster/:artistName', ClientController.getByName);

    router.get('/tags/all', TagController.getAll);

    router.get('/user/current', UserController.getLoggedInUser);

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