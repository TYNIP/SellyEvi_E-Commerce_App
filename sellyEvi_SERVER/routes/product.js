const express = require('express');
const router = express.router();
const ProductService= require('../services/ProductService');
const ProductServiceInstance= new ProductService();

/* PRODUCTs */

module.exports = (app) =>{
    app.use('/products', router);

    //Get user products
    router.get('/', async(req, res, next)=>{
        try{
            const queryParams = req.query;
            const response = await ProductService.list(queryParams);
            res.status(200).send(response);
        } catch(err){
            next(err);
        };
    });


    //Find user product
    router.get('/:productId', async(req, res, next)=>{
        try{
            const {productId} = req.params.productId;
            const response = await ProductServiceInstance.get(productId);
        } catch(err){
            next(err);
        };
    });
};