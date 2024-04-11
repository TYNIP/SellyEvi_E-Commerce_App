const OrderModel = require('../models/orders');
const OrderItemModel = require('../models/order_items');
const CartItemModel = require('../models/cart_items');
const OrderItemModelInstance = new OrderItemModel();

/* SERVICE - ORDER */

module.exports = class OrderService{

    //Create new order and save it
    async create(id, cartId){
        console.log('hola?');
        try {
            console.log(cartId);
            const cart = await CartItemModel.finditemsByCartId(cartId);
            console.log('this cart',cart);
            if(cart.length !== 0 ){
                const total = cart.reduce((accumulator, currentValue) => Number(accumulator.total) + Number(currentValue.total));
                const OrderData = {total, id}
                const Order = new OrderModel();
                console.log('the order info', OrderData);
                const order = await Order.create(OrderData);
                console.log('order created yupiiii');

                for(let i in cart){
                    console.log('I enter to the final stage');
                    const OrderItemsData = {
                        quantity: cart[i].quantity, 
                        order_id: order.id, 
                        product_id: cart[i].product_id, 
                        price: cart[i].price
                    };
                    console.log('order items data:', OrderItemsData);
                    const orderItem = await OrderItemModel.createOrderItems(OrderItemsData);
                    return orderItem;
                };
            }
            return [];
        } catch(err) {
            console.log('error in order service :C');
            throw err;
        };
    };
    //Load/list user orders by user Id
    async list(userId){
        try {
            const orders = await OrderItemModelInstance.findByUser(userId);
            return orders;

        }catch(err){
            throw err;
        };
    };

    //Load user orders by orer id
    async findById(orderId){
        try{
            const order = await OrderItemModelInstance.findById(orderId);
            return order;

        } catch(err){
            throw err;
        };
    };
};