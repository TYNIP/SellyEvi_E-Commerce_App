const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local');
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const UserModel= require('../models/users');
const UserModelInstance = new UserModel();
const { GOOGLE } = require('../config');

/* API AUTH MANAGEMENT */

module.exports = (app)=>{
    console.log('passport running');
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            console.log('deserializing user');
            const user = await userService.get({ id });
            console.log(user)
            done(null, user); 
        } catch (err) {
            done(err); 
        }
    });

    passport.use(new LocalStrategy(
        async (username, password, done)=>{
            try {
                const user = await AuthServiceInstance.login({email: username, password: password});
                return done(null, user);
            } catch (err) {
                return done(err);
            };
        }
    ));

    passport.use("auth-google",new GoogleStrategy({
        clientID: GOOGLE.CONSUMER_KEY,
        clientSecret: GOOGLE.CONSUMER_SECRET,
        callbackURL: GOOGLE.CALLBACK_URL
    },
    async function(accessToken, refreshToken, profile, done) {
        try{
            console.log('yeah server')
            const user = await UserModelInstance.findOneByEmail(profile.emails[0].value);
            return done(null, user);
        } catch(err){
            console.log('nooo server')
            return done(err);
        };
      }));

    console.log('passport stops');
    return passport;
};