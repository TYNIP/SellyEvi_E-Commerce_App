const createError = require('http-errors');
const UserModel = require('../models/users');
const UserModelInstance = new UserModel();

/* SERVICE - AUTH USER */

module.exports = class AuthService {

    //Create user if it does not exists already. Throw an error if it does
    async register(data){
        const {email} = data;
        try{
            const user = await UserModelInstance.findOneByEmail(email);
            if(user){
                throw createError(409, 'Email already registered');
            } else {
                return await UserModelInstance.create(data);
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

            if(!user){
                throw createError(401,'Incorrect Username or Password');
            };
            if(user.password !== password){
                throw createError(401,'Incorrect Username or Password');
            };

            return user;
        } catch(err){
            throw createError(500, err);
        };
    };

    //google log in
    async googleLogin(profile){
        const {id, displayName} = profile;
        try{
            const user = await UserModelInstance.findOneByGoogleId(id);
            if(!user){
                return await UserModelInstance.create({google: {id, displayName}});
            } else {
                console.log(user);
                return user;
            }
        } catch(err){
            throw createError(500, err);
        }
    };
    //facebook login
    async facebookLogin(profile) {
        const { id, displayName } = profile;
        try {
          const user = await UserModelInstance.findOneByFacebookId(id);
          if (!user) {
            return await UserModelInstance.create({ facebook: { id, displayName } });
          }
          console.log(user);
          return user;
        } catch(err) {
          throw createError(500, err);
        }
    };
};