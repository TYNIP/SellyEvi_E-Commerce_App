const db = require('../db/index');
const pgp = require('pg-promise')({capSQL: true});

/* Model for users table */

//Conected with usersService
module.exports = class UserModel {
    //Create a new user record 
    /** 
     * @param {Object} data [user data]
     * @return {Object|null} [Creted user record]
    */
    async create(data){
        try{
            const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
            const result = await db.query(statement);
            if(result.rows?.length){
                return result.rows[0];
            } else {
                return null;
            };
        } catch(err){
            throw new Error(err);
        };
    };

    //Update user record 
    /** 
     * @param {Object} data [user data]
     * @return {Object|null} [Updated user record]
    */
   async update(data){
    try {
        const {id, ...params} = data;
        const condition = pgp.as.format('WHERE id=${id} RETURNING *', {id});
        const statement = pgp.helpers.update(params, null, 'users') + condition;
        const result = await db.query(statement);

        if(result.rows?.length){
            return result.rows[0];
        } else {
            return null;
        };

    } catch(err){
        throw new Error(err);
    };
   };

   //Find a user record by email
   /**
    * @param {String} email [Email address]
    * @return {Object|null} [User record]
    */
   async findOneByEmail(email){
    try{
        const statement = `SELECT * FROM users WHERE email=$1`;
        const queryParams = [email];
        const result = await db.query(statement, queryParams);

        if(result.rows?.length){
            return result.rows[0];
        } else {
            return null;
        };

    } catch(err){
        throw new Error(err);
    };
   };

   //Finds a user record by id
   /** 
    * @param {String} id [User ID]
    * @return {Object|null} [User Object]
   */
  async findOneById(id){
    try{
        const statement = `SELECT * FROM users WHERE id = $1`;
        const queryParams = [id];
        const result = await db.query(statement, queryParams);

        if(result.rows?.length){
            return result.rows[0];
        } else {
            return null;
        };

    } catch(err){
        throw new Error(err);
    };
  };
};