const db = require('../db/index');
const pgp = require('pg-promise')({capSQL: true});
const { DateTime } = require('luxon');

/* Model for carts table*/

//Conected with cartService
module.exports = class CartModel{
    constructor(data = {}) {
        this.created = data.created || DateTime.utc().toISO();
        this.modified = DateTime.utc().toISO();
        this.converted = data.converted || null;
        this.isActive = data.isActive || true;
    };

    //Create new user car 
    /** 
     * @param {Onject} data [User data]
     * @return {Object|null} [Created user record]
    */
    async create(userId){
        try{
            const data = {user_id: userId};
            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
            const result = await db.query(statement);
            if(result.rows?.length){
                return result.rows[0];
            } else {
                return null;
            };

        } catch(err){
            throw new Error(err);
        }
    };

    //Loads a cart by User id
    /** 
     * @param {number} userId [User id]
     * @return {Object|null} [Cart record]
    */
   static async findOneByUserId(userId){
    try{
        const statement = `SELECT * FROM carts WHERE user_id = $1`;
        const queryParams = [userId];
        const result = await db.query(statement, queryParams);

        if(result.rows?.length){
            return result.rows[0];
        } else {
            return [];
        }
    } catch(err){
        throw new Error(err);
    }
   };

   //Loads a cart by Id
   /** 
    * @param {number} id [Cart Id]
    * @return {Object|null} [cart records]
   */

   static async findOneById(id) {
    try {
        const statement = `SELECT * FROM carts WHERE id = $1`;
        const queryParams = [id];
        const result = await db.query(statement, queryParams);
         if(result.rows?.length){
            return result.rows[0];
         } else {
            return [];
         };

    } catch(err){
        throw new Error(err);
    }
   };

   //Deletes cart
    /** 
     * @param {Object} id [Cart item id]
     * @return {Object|[]} [Deleted cart item]
    */
    static async deleteCart(id){
        try{
            const statement = `DELETE FROM carts
            WHERE id=$1 RETURNING *`;
            const queryParams = [id];
            const result = await db.query(statement, queryParams);
            return 'Cart Deleted';
    
        } catch (err) {
            throw new Error(err);
        }
    };
};