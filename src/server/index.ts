import http from 'http';
import expressSession from 'express-session';
import app from './app';
import settings from './config/settings.json';
import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import {
    User,
    Artist,
    Tag,
    File,
    Contact,
    Feed,
    ArtistContact,
    UserArtist
} from "../shared/dao";
import { fileService } from './services/file.service';

const start = async () => {
    let session = expressSession({
        secret: 'test',
        resave: false,
        saveUninitialized: false,
        unset: 'destroy'
    });

    await createConnection({
        type: "postgres",
        port: settings.db.port,
        username: settings.db.username,
        database: settings.db.name,
        password: settings.db.password,
        host: settings.db.endpoint,
        entityPrefix: settings.db.schema + '.',
        entities: [
            User,
            Artist,
            Tag,
            File,
            Contact,
            Feed,
            ArtistContact,
            UserArtist
        ],
        synchronize: true
    } as ConnectionOptions);

    await fileService.initialize(settings.s3)

    const _app = app(settings, session);
    const server = http.createServer(_app);

    server.listen(settings.port, () => {
        console.log(`\nRunning on port ${settings.port}`);
        console.log(`--------------------------\n`)
    })
}

start();