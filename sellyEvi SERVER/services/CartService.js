const CartModel = require('../models/carts');
const CartItemModel = require('../models/cart_items');
const OrderModel = require('../models/orders');

/* SERVICE - CART */

module.exports = class CartService {

    //Create new car and save it
    async create(data){
        const {userId} = data;
        try {
            const Cart = new CartModel();
            const cart = await Cart.create(userId);
            return cart;

        } catch(err) {
            throw err;
        };
    };

    //Loads user cart based on its Id including cart items to add them to cart record
    async loadCart(userId){
        try{
            const cart = await CartModel.findOneByUserId(userId);
            const items = await CartItemModel.find(cart.id);
            cart.items = items;
            return cart;

        } catch(err){
            throw err;
        };
    };

    //Load user cart based on it id and create a cart item
    async addItem(userId, item){
        try{
            const cart = await CartModel.findOneByUserId(userId);
            const cartItem = await CartItemModel.create({cartId: cart.id, ...item});
            return cartItem;

        } catch(err){
            throw err;
        };
    };

    //Remove cart item line by  Id
    async removeItem(cartItemId){
        try{
            const cartItem = await CartItemModel.delete(cartItemId);
            return cartItem;

        } catch(err){
            throw err;
        };
    };

    //Update cart item by id
    async updateitem(cartItemId, data){
        try{
            const cartItem = await CartItemModel.update(cartItemId, data);
            return cartItem;

        } catch(err){
            throw err;
        };
    };

    /* 
    Check out user
    Load cart items, generate the total price and initial order.
    Make charge to payment (Not real payment)
    If succesful charge order status changes to COMPLETE
    */
   async checkout(cartId, userId, paymentInfo){
    try{
        const {DB} = require('../config');
        const stripe = require('stripe')(DB.CH_OUT);

        const cartItems = await CartItemModel.find(cartId);
        const total = cartItems.reduce((total, item) => {
            return total += Number(item.price);
        }, 0);

        const Order = new OrderModel({total, userId});
        Order.addItems(cartItems);
        await Order.create();

        const charge = await stripe.charges.create({
            amount: total,
            currency: 'usd',
            source: paymentInfo.id,
            descriptio: 'Selly Evi Payment (NON EXISTANT - ACADEMIC APP)'
        });

        const order = Order.update({status: 'COMPLETE'});
        return order;
    } catch(err){
        throw err;
    };
   };
};