const passport = require('passport');
const LocalStrategy = require('passport-local');
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

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

    return passport;
};