const createError = require('http-errors');
const ProductModel = require('../models/products');
const ProductModelInstance = new ProductModel();

/* SERVICE - PRODUCTS */

module.exports = class ProductService {

    //Load products
    async list(options){
        try{
            const products = await ProductModelInstance.find(options);
            return products;
        } catch (err){
            throw err;
        };
    };

    //get product if exists or throws an error if not
    async get(id){
        try{
            const product = await ProductModelInstance.findOne(id);

            if(!product){
                throw createError(404, 'Product not found');
            } else {
                return product;
            };
        } catch (err){
            throw err;
        };
    };
};