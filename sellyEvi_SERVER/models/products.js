const db = require('../db/index');
const createError = require('http-errors');
/* Model for products table */

//Conected with productService
module.exports = class ProductModel {
    //List products / also from user
    /** 
     * @param {Object} Options [Query Options]
     * @return {Array} [Array of products]
    */

    async findAll() {
        try{
            const statement = `SELECT * FROM  products`;
            const result = await db.query(statement);

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

    async finOneById(id){
        try{
            const statement = `SELECT * FROM products WHERE id = $1`;
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

    //Retrieve product search
    /** 
     * @param {Object} search
     * @return {Object|Array} [product record] 
    */

    async findProducts(search){
        try{
            console.log('final', search)
            const statement = `SELECT *
                   FROM products
                   WHERE name LIKE '%' || $1 || '%'
                      OR description LIKE '%' || $1 || '%';`;
                      const queryParams = [search];
                      const result = await db.query(statement, queryParams);
                      console.log(result.rows?.length);
            if(result.rows?.length){
                return result.rows;
            } else {
                return [];
            };
            
        } catch (err){
            throw new Error(err);
        };
    };
};