const express = require('express');
const router = express.Router();
const ProductService= require('../services/ProductService');
const ProductServiceInstance= new ProductService();

/* PRODUCTs */

module.exports = (app) =>{
    app.use('/products', router);

    //Get products / also user
    router.get('/', async(req, res, next)=>{
        try{
            const response = await ProductServiceInstance.allList();
            res.status(200).send(response);
        } catch(err){
            next(err);
        };
    });


    //Find products by id
    router.get('/:productId', async(req, res, next)=>{
        try{
            const productId = req.params.productId;
            const response = await ProductServiceInstance.get(productId);
            res.status(200).send(response);
        } catch(err){
            next(err);
        };
    });

    //Find search
    router.get('/search/:search', async (req, res, next) => {
        try {
            const searchTerm = req.params.search.toLowerCase();
            console.log("Received search term:", searchTerm);
            const response = await ProductServiceInstance.getSearch(searchTerm);
            console.log(response);
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    });
};