const express = require('express');
const router = express.router();
const OrderService = require('../services/OrderService');
const OrderServiceInstance = new OrderService();

/* ORDERs */
module.exports = (app) =>{
    app.use('/orders', router);

    //Get user orders
    router.get('/', async (req, res, next) =>{
        try{
            const {id} = req.user;
            const response = await OrderServiceInstance.list(id);
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });

    //Find user order
    router.get('/:orderId', async (req, res, next) =>{
        try{
            const {orderId} = req.params.orderId;
            const response = await OrderServiceInstance.findById(orderId);
            res.status(200).send(response);
        } catch(err){
            next(err);
        };
    });
};