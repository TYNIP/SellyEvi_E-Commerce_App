const createError = require('http-errors');
const UserModel = require('../models/users');
const UserModelInstance = new UserModel();

/* SERVICE - USERS */

module.exports = class UsersService{

    //Get user if exists or throw an error if not
    async get(data){
        const {id} = data;
        try{
            const user = await UserModelInstance.findOneById(id);

            if(!user){
                throw createError(404, 'User record noy found');
            } else {
                return user;
            };
        } catch(err){
            throw err;
        };
    };

    //Update user if exists
    async update(data){
        try{
            const user =- await UserModelInstance.update(data);
            return user;
        } catch(err){
            throw err;
        };
    };
};