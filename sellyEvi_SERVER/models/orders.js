const db = require('../db/index');
const { DateTime } = require('luxon');
const pgp = require('pg-promise')({capSQL: true});
const OrderItem = require('./order_items');

/* Model for orders table */

//Conected with orderService and sartService
module.exports = class OrderModel{
    constructor(data = {}) {
        this.created = data.created || DateTime.utc().toISO();
        this.items = data.items || [];
        this.modified = DateTime.utc().toISO();
        this.status = data.status || 'PENDING';
        this.total = data.total || 0;
        this.userId = data.userId || null;
      };

      //add items to cart using the order items model
      addItems(items){
        this.items = items.map(item=> new OrderItem(item));
      };

      //Creates a new order fro the user
      /** 
       * @return {Object|null} [Created order record]
      */
     async create(OrderData){
        try{
            const {total, id} = OrderData;
            console.log('starting to create an order');
            const data = {total: total, status: 'created', user_id: id };
            const statement = pgp.helpers.insert(data, null, 'orders') + 'RETURNING *';
            const result = await db.query(statement);
            console.log('results from creatin an order', result.rows[0]);
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
                return result.rows[0];
            } else {
                console.log('nothing found order')
                return [];
            };

        } catch(err){
            throw new Error(err);
        };
     };

     //Retrieve order by ID
     /**
      * @param {number} orderId [order id]
      * @return {Object|null} [order record]
      */
     static async findById(orderId){
        try{
            const statement = `SELECT *
            FROM orders WHERE id = $1`;
            const queryParams = [orderId];
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