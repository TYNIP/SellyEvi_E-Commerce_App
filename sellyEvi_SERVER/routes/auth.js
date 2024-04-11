const express = require('express');
const router = express.Router();

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const CartService = require('../services/CartService');
const CartServiceInstance = new CartService();
const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();

/* AUTHs */

module.exports = (app, passport) =>{
    app.use('/auth', router);

    //Endpoint registration
    router.post('/register', async(req, res, next) =>{
        try{
            const data = req.body;
            const response = await AuthServiceInstance.register(data);
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });

    //Endpoint login
    router.post('/login', async(req, res, next)=>{
        try{
            const {username, password} = req.body;
            const response = await AuthServiceInstance.login({email: username, password: password});
            req.session.user = response;
            res.status(200).send({user:response});
        } catch(err){
            next(err);
        };
    });

    //Google
    router.get('/google', passport.authenticate("auth-google", {scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      ]}), async (req, res, next) => {
        try{
            const {email, password} = req.user;
            const response = await AuthServiceInstance.login({email: email, password: password});
            req.session.user = response;
            res.status(200).send({user:response});
        } catch(err){
            console.log('vamooooo');
            throw err;
        }
      });

    //Log in status
    router.get('/logged_in', async(req, res, next)=>{
        try{
            console.log('status log in retreive')
            console.log(req.session.user);
            const {id} = req.session.user;
            console.log(id);
            const cart = await CartServiceInstance.loadCart(id);
            const user = await UserServiceInstance.get({id});
            console.log('loading cart from logged in status');
            console.log(cart);
            res.status(200).send({
                cart,
                loggedIn: true,
                user
            });
        } catch(err){
            console.log(err);
            next(err);
        }
    });
    //Log Out Users
    router.post('/logout', function(req, res, next){
        req.session.destroy();
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/login');
        });
      });
}
