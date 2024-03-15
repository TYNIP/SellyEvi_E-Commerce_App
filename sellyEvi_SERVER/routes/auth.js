const express = require('express');
const router = express.router();
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

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
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });
}

