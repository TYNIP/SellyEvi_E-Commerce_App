const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService');
const CartServiceInstance = new CartService();
const OrderService = require('../services/OrderService');
const OrderServiceInstance = new OrderService();

/* CARTs */

module.exports = (app)=> {
    app.use('/carts', router);

    //Get user cart
    router.get('/cart', async(req, res, next) => {
        try {
            const {id} = req.session.user;
            const response = await CartServiceInstance.loadCart(id);
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });


    //Create user cart
    router.post('/cart', async(req, res, next) => {
        try{
            const {id} = req.session.user;
            const response = await CartServiceInstance.create({userId: id});
            res.status(200).send(response);
        } catch(err){
            next(err);
        };
    });

    //Add item to user cart
    router.post('/cart/items', async(req, res, next) => {
        try{
            const {id} = req.session.user;
            const data = req.body;
            const response = await CartServiceInstance.addItem(id, data);
            res.status(200).send({status:response});
        } catch(err){
            next(err);
        };
    });

    //Update item from user cart
    router.put('/cart/items/:cartItemId', async(req, res, next) => {
        try{
            const {id} = req.session.user;
            const {cartItemId} = req.params;
            const {qty} = req.body;
            const response = await CartServiceInstance.updateItem(id, cartItemId, qty);
            res.status(200).send(response);

        } catch(err){
            next(err);
        };
    });

    //Delete item from user cart
    router.delete('/cart/items/:cartItemId', async(req, res, next) =>{
        try{
            const {id} = req.session.user;
            const {cartItemId} = req.params;
            const response = await CartServiceInstance.removeItem(id, cartItemId);
            res.status(200).send(response);
            
        } catch(err){
            next(err);
        };
    });

    //Checkout user cart
    router.post('/cart/checkout', async(req, res, next) =>{
        try{
            const {id} = req.session.user;
            const {cartId} = req.body;
            const resStatus = await OrderServiceInstance.create(id, cartId);
            await CartServiceInstance.removeAllItems(cartId);
            const cartStatus = await CartServiceInstance.removeCart(cartId);
            const response = `${resStatus}. ${cartStatus}`;
            res.status(200).send({status:response});
        } catch(err){
            next(err);
        };
    });
};