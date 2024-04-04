const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local');
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const { FACEBOOK, GOOGLE } = require('../config');

/* API AUTH MANAGEMENT */

module.exports = (app)=>{
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });
    passport.deserializeUser((user, done)=>{
        done(null, {id});
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

    /* JSWT */
    passport.use(new GoogleStrategy({
        clientID: GOOGLE.CONSUMER_KEY,
        clientSecret: GOOGLE.CONSUMER_SECRET,
        callbackURL: GOOGLE.CALLBACK_URL
    },
    async(acccessToken, regreshToken, profile, done)=>{
        try{
            const user = await AuthServiceInstance.googleLogin(profile);
            return done(null, user);
        } catch(err){
            return done(err);
        }
    }));
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK.CONSUMER_KEY,
        clientSecret: FACEBOOK.CONSUMER_SECRET,
        callbackURL: FACEBOOK.CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthServiceInstance.facebookLogin(profile);
          return done(null, user);
        } catch(err) {
          return done(err);
        }
      }
    ));

    return passport;
};