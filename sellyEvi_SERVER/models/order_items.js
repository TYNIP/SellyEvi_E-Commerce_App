const db = require('../db/index');
const { DateTime } = require('luxon');
const pgp = require('pg-promise');

/* Model for order_items table */

//Conected with orderService
module.exports = class OrderItemModel {
      //Create new order item
      /**
       * @param {Object} data [Order item data]
       * @return {Object|null} [Created order item]
       */
      static async createOrderItems(data){
        console.log("hola2?");
        try{
            console.log('order item creating wua', data);
            const statement = pgp.helpers.insert(data, null, 'order_items');
            console.log('the final statement', statement);
            await db.query(statement);
            return 'Order Added Successfully';
        } catch(err){
            console.log('como que otro error ahhhh', err);
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