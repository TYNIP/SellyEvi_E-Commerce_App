const db = require('../db/index');
const { DateTime } = require('luxon');
const pgp = require('pg-promise')({capSQL: true});
const OrderItem = require('./order_items');

/* Model for orders table */

//Conected with orderService and sartService
module.exports = class OrderModel{
      //Creates a new order fro the user
      /** 
       * @return {Object|null} [Created order record]
      */
     async create(OrderData){
        try{
            const {total, id} = OrderData;
            const data = {total: total, status: 'Complete', user_id: id };
            const statement = pgp.helpers.insert(data, null, 'orders') + 'RETURNING *';
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

     //Update an order for a user
     /**  
      * @param {Object} id [Order id]
      * @param {Object} data [Order data]
      * @return {Object|null} [updated order record]
     */
     async update(data){
        try{
            const condition = pgp.as.format('WHERE id=${id} RETURNING *', {id: this.id});
            const statement = pgp.helpers.update(data, null, 'orders') + condition;
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

     //Loads orders for user
     /**
      * @param {number} userId [User id]
      * @return {Array} [Order records]
      */
     static async findByUser(userId){
        try{
            const statement = `SELECT * FROM orders
            WHERE user_id = $1`;
            const queryParams = [userId];
            const result = await db.query(statement, queryParams);

            if(result.rows?.length){
                return result.rows;
            } else {
                return [];
            };

        } catch(err){
            throw new Error(err);
        };
     };
};