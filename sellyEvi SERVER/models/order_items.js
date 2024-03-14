const db = require('../db/index');
const { DateTime } = require('luxon');
const pgp = require('pg-promise');

/* Model for order_items table */

//Conected with orderService
module.exports = class OrderItemModel {
    constructor(data = {}) {
        this.created = data.created || DateTime.utc().toISO();
        this.description = data.description;
        this.modified = DateTime.utc().toISO();
        this.name = data.name;
        this.price = data.price || 0;
        this.productId = data.id;
        this.qty = data.qty || 1;
        this.orderId = data.orderId || null;
      };

      //Create new order item
      /**
       * @param {Object} data [Order item data]
       * @return {Object|null} [Created order item]
       */
      static async create(data){
        try{
            const statement = pgp.helpers.insert(data, null, 'order_items') + 'RETURNING *';
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

      //Retreive order items for an order by id
      /** 
       * @param {Object} orderId [Order id]
       * @return {Array} [Created cart item]
      */
     static async find(orderId){
        try{
            const statement = `SELECT oi.quantity, oi.id AS "cartItemId", p.* FROM order_items AS oi
            INNER JOIN products AS p ON p.id = oi.productId
            WHERE order_id = $1`;
            const queryParams = [orderId];
            const result = await db.query(statement, queryParams);

            if(result.rows?.length){
                return result.rows[0];
            } else {
                return null;
            };

        } catch(err){
            throw new Error(err);
        }
     };
};