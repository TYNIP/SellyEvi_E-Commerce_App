const express = require('express');
const router = express.router();
const CartService = require('../services/CartService');
const CartServiceInstance = new CartService();

/* CARTs */

module.exports = (app)=> {
    app.use('/carts', router);

    //Get user cart
    router.get('/cart', async(req, res, next) => {
        try {
            const {id} = req.user;
            const response = await CartServiceInstance.loadCart(id);
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });

    //Update user cart
    router.put('/cart', async(req, res, next) => {
        try{
            const { id } = req.user;
            const response = await CartServiceInstance.get({id});
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });

    //Create user cart
    router.post('/cart', async(req, res, next) => {
        try{
            const {id} = req.user;
            const response = await CartServiceInstance.create({userId: id});
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });

    //Add item to user cart
    router.post('/cart/items', async(req, res, next) => {
        try{
            const {id} = req.user;
            const data = req.body;
            const response = await CartServiceInstance.addItem(id, data);
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });

    //Update item from user cart
    router.put('/cart/items/:cartItemId', async(req, res, next) => {
        try{
            const {cartItemId} = req.params.cartItemId;
            const data = req.body;
            const response = await CartServiceInstance.updateItem(cartItemId, data);
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });

    //Delete item from user cart
    router.delete('/cart/items/:cartItemId', async(req, res, next) =>{
        try{
            const {cartItemId} = req.params.cartItemId;
            const response = await CartServiceInstance.removeItem(cartItemId);
            res.status(200).send(response);
            
        } catch(err){
            next(err);
        };
    });

    //Checkout user cart
    router.post('/cart/checkout', async(req, res, next) =>{
        try{
            const {id} = req.user;
            const {cartId, paymentInfo} = req.body;
            const response = await CartServiceInstance.checkout(cartId, id, paymentInfo);
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });
};