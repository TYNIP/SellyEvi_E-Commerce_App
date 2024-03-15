const db = require('../db/index');

/* Model for products table */

//Conected with productService
module.exports = class ProductModel {

    //List products
    /** 
     * @param {Object} Options [Query Options]
     * @return {Array} [Array of products]
    */

    async find(options = {}) {
        try{
            const statement = `SELECT * FROM  products`;
            const queryParams = [];
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

    //Retrieve product by Id
    /** 
     * @param {Object} id
     * @return {Object|null} [product record] 
    */

    async finOne(id){
        try{
            const statement = `SELECT * FROM product WHERE id = $1`;
            const queryParams = [id];
            const result = await db.query(statement, queryParams);

            if(result.rows?.length){
                return result.rows[0];
            } else {
                return null;
            };
            
        } catch (err){
            throw new Error(err);
        };
    };
};