const db = require('../db/index');
const { DateTime } = require('luxon');
const pgp = require('pg-promise')({capSQL: true});

/* Model for order_items table */

//Conected with orderService
module.exports = class OrderItemModel {
      //Create new order item
      /**
       * @param {Object} data [Order item data]
       * @return {Object|null} [Created order item]
       */
      static async createOrderItems(data){
        try{
            const statement = pgp.helpers.insert(data, ['quantity', 'order_id', 'product_id', 'price' ], 'order_items') + 'RETURNING *';
            await db.query(statement);
            return 'Successful Checkout | Order Created';
        } catch(err){
            throw new Error(err);
        }
    };

      //Retreive order items for an order by id
      /** 
       * @param {Object} orderId [Order id]
       * @return {Array} [Created cart item]
      */
     static async findOrders(orderId){
        try{
            const statement = `SELECT oi.quantity, oi.id AS "cartItemId", p.* FROM order_items AS oi
            INNER JOIN products AS p ON p.id = oi.product_id
            WHERE order_id = $1`;
            const queryParams = [orderId];
            const result = await db.query(statement, queryParams);
            if(result.rows?.length){
                return result.rows;
            } else {
                return null;
            };

        } catch(err){
            throw new Error(err);
        }
     };
};