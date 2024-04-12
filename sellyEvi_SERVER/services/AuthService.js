const createError = require('http-errors');
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const UserModelInstance = new UserModel();

/* SERVICE - AUTH USER */

module.exports = class AuthService {

    //Create user if it does not exists already. Throw an error if it does
    async register(data){
        const {email, password, firstname, lastname} = data;
        try{
            const user = await UserModelInstance.findOneByEmail(email);
            if(user){
                throw createError(409, 'Email already registered');
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = {email, password: hashedPassword, firstname, lastname};
                return await UserModelInstance.create(newUser);
            };
            
        } catch(err){
            throw createError(500, err);
        };
    };

    //Log in user if exist, if not throw error
    async login(data){
        const {email, password} = data;
        try{
            const user = await UserModelInstance.findOneByEmail(email);
            const realPwd = await bcrypt.compare(password, user.password);
            if(!user){
                throw createError(401,'Incorrect Username or Password');
            };
            
            if(!realPwd){
                throw createError(401,'Incorrect Username or Password');
            };

            return user;
        } catch(err){
            throw createError(500, err);
        };
    };
};