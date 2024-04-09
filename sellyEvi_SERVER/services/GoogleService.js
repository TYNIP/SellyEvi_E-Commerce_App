const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE } = require('../config');
const passport = require('passport');
const express = require('express');
const loginRouter = express.Router();

    /* JSWT */
passport.use("auth-google",new GoogleStrategy({
    clientID: GOOGLE.CONSUMER_KEY,
    clientSecret: GOOGLE.CONSUMER_SECRET,
    callbackURL: GOOGLE.CALLBACK_URL
},
async function(accessToken, refreshToken, profile, done) {
    try{
        const user = await UserModelInstance.findOneByEmail(profile.emails[0].value);

        if(!user){
            throw createError(401,'Incorrect Username or Password');
        };
        return user;
    } catch(err){
        throw createError(500, err);
    };
  }));
