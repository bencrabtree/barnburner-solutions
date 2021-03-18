import express from 'express';
import routes from './routes';
import passport from './auth/passport';

export default (settings: any, session: any) => {
    let server = express();
    server.use(session);
    let googleAuth = passport(settings);
    routes(server, googleAuth, settings);
    return server;
}