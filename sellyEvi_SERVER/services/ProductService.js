const createError = require('http-errors');
const ProductModel = require('../models/products');
const ProductModelInstance = new ProductModel();

/* SERVICE - PRODUCTS */

module.exports = class ProductService {
    //Load all products
    async allList(){
        try{
            const products = await ProductModelInstance.findAll();
            return products;
        } catch (err){
            throw new Error(err);
        };
    };
    //Load products from user
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
            const product = await ProductModelInstance.finOneById(id);
            if(!product){
                throw createError(404, 'Product not found');
            } else {
                return product;
            };
        } catch (err){
            throw new Error(err);
        };
    };

    //get product from search
    async getSearch(search){
        try{
            console.log('yoo2', search)
            const product = await ProductModelInstance.findProducts(search);
            if(!product){
                throw createError(404, 'Product not found');
            } else {
                return product;
            };
        } catch (err){
            throw new Error(err);
        };
    };
};