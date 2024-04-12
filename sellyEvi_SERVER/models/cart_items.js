const db = require('../db/index');
const pgp = require('pg-promise')({capSQL: true});

/* Model for car_items table */

//Conected with cartService
module.exports = class CartItemModel {
    //Loads cart items from user by cart id and product id
    /** 
     * @param {number} productId [User id]
     * @param {number} userId [User id]
     * @return {Object|null} [Cart record]
    */
   static async findOneByCartId(productId, cartId){
    try{
        const statement = `SELECT * FROM cart_items WHERE product_id = $1 AND cart_id = $2`;
        const queryParams = [productId, cartId];
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

   //find all cart items
    /** 
     * @param {number} cartId  [User id]
     * @return {Object|null} [Cart record]
    */
    static async finditemsByCartId(cartId){
        try{
            const statement = `SELECT * FROM cart_items WHERE cart_id = $1`;
            const queryParams = [cartId];
            const result = await db.query(statement, queryParams);
            if(result.rows?.length){
                return result.rows;
            } else {
                return [];
            }
        } catch(err){
            throw new Error(err);
        }
       };

    //Creates a new cart set cart items
    /**
    * @param  {Object}      data [Cart item data]
    * @return {Object|null}      [Created cart item]
    */
    static async create(data){
        try{
            const statement = pgp.helpers.insert(data, null, 'cart_items');
            await db.query(statement);
            return 'Product Added Successfully';
        } catch(err){
            throw new Error(err);
        }
    };

    //Updates existing car items
    /**
    * @param  {Object}      data [Cart item data]
    * @param  {Object}      id   [Cart item id]
    * @return {Object|null}      [Updated cart item]
    */
    static async update(id, data){
        try {
            const condition = pgp.as.format(' WHERE id = ${id} RETURNING *', {id});
            const statement = pgp.helpers.update(data, null, 'cart_items') +  condition;
            await db.query(statement);
            return 'Product Added Successfully';
        } catch(err){
            throw new Error(err);
        }
    };

    //Retrieve Cart items for a cart
    /** 
     * @param {object} cartId [Cart ID]
     * @return {Array} [Created cart item]
     */ 

    static async find(cartId){
        try{
            const statement = `SELECT ci.* AS "Cart Items Id", p.id, p.name, p.images FROM cart_items AS ci
            INNER JOIN products AS p ON p.id = ci.product_id
            WHERE ci.cart_id = $1`;
            const queryParams = [cartId]; 
            const result = await db.query(statement, queryParams);
            if (result.rows?.length){
                return result.rows;
            } else {
                return [];
            };

        } catch (err) {
            throw new Error(err);
        }
    };

    //Deletes a cart item
    /** 
     * @param {Object} id [Cart item id]
     * * @param {Object} id [Cart id]
     * @return {Object|[]} [Deleted cart item]
    */
   static async deleteItem(cartItemId, cartId){
    try{
        const statement = `DELETE FROM cart_items
        WHERE cart_id=$1 AND product_id=$2 RETURNING *`;
        const queryParams = [cartId, cartItemId];
        await db.query(statement, queryParams);
        return 'Cart Item Deleted';

    } catch (err) {
        throw new Error(err);
    }
    }

    //Deletes a cart item
    /** 
     * @param {Object} id [Cart item id]
     * @return {Object|[]} [Deleted cart item]
    */
   static async deleteAllItemsByCartId(id){
        try{
            const statement = `DELETE FROM cart_items
            WHERE cart_id=$1 RETURNING *`;
            const queryParams = [id];
            const result = await db.query(statement, queryParams);
            return 'Cart Items Removed successfully';

        } catch (err) {
            throw new Error(err);
        }
    }
};