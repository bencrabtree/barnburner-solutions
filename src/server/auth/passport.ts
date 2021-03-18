// 'use strict';
import { getRepository } from 'typeorm';
import { User } from '../../shared/dao';
import { userService } from "../services/user.service";
export const passport = require('passport');
export let userProfile: User;

export const clearUsersession = () => {
    userProfile = null;
}

export default function(settings: any) {
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const JWTStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    const GOOGLE_CLIENT_ID = settings.auth.clientId;
    const GOOGLE_CLIENT_SECRET = settings.auth.clientSecret;
    console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'none' ? settings.auth.devRedirect : settings.auth.prodRedirect)
    //
    passport.use(new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.NODE_ENV === 'none' ? settings.auth.devRedirect : settings.auth.prodRedirect
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let email = profile.emails.filter(x => x.verified)[0]?.value
                let user: User = await userService.getUserByEmail(email);
                if (user) {
                    userProfile = await userService.updateUser(email, { last_login: new Date() });
                // } else if (email) {
                //     userProfile = await userService.createUser(email, profile.name.givenName, profile.name.familyName, profile.photos[0].value)
                //     console.log("Creating User", userProfile)
                } else {
                    console.log('Unreadable email')
                }
            } catch (error) {
                console.log("Error creating user session:", error)
            }
            return done(null, userProfile);
        }
    ));
    //
    passport.use(new JWTStrategy(
        {
            jwtFromRequest: function(req) { // tell passport to read JWT from cookies
                var token = null;
                if (req && req.cookies){
                    token = req.cookies['token']
                }
                return token
            },
            secretOrKey: settings.auth.jwtSecret
        },
        async (payload, cb) => {
            let user: User = await userService.getUserByEmail(payload.email);
            if (user) {
                return cb(null, user);
            } else {
                return cb('Error authenticating user', false)
            }
        }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });

    return passport;
}