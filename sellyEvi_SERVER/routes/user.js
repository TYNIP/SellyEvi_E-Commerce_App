const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();

/* USERs */

module.exports = (app) =>{
    app.use('/users', router);

    //Get user
    router.get('/:userId', async(req, res, next)=>{
        try{
            const {userId} = req.params.userId;
            const response = await UserServiceInstance.get(userId);
            res.status(200).send(response);
        } catch(err){
            next(err);
        };
    });

    //Update user
    router.put('/:userId', async(req, res, next)=>{
        try{
            const {userId} = req.params.userId;
            const data = req.body;
            const response = await UserServiceInstance.update({id: userId, ...data});
            res.status(200).send(response);
        } catch(err){
            next(err);
        };
    });
};