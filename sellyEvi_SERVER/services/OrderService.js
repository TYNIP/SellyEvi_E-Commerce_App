const OrderModel = require('../models/orders');
const OrderItemModel = require('../models/order_items');
const CartItemModel = require('../models/cart_items');

/* SERVICE - ORDER */

module.exports = class OrderService{

    //Create new order and save it
    async create(id, cartId){
        try {
            const cart = await CartItemModel.finditemsByCartId(cartId);
            if(cart.length !== 0 ){
                let total;
                 if(cart.length > 1){
                    total = cart.reduce((accumulator, currentValue) => Number(accumulator.total) + Number(currentValue.total));
                } else{
                    total = cart[0].total;
                }
                const OrderData = {total, id}
                const Order = new OrderModel();
                const order = await Order.create(OrderData);
                let OrderItemsData = [];
                for(let i in cart){
                    OrderItemsData.push({
                        quantity: cart[i].quantity, 
                        order_id: order.id, 
                        product_id: cart[i].product_id, 
                        price: cart[i].price
                    });
                };
                const orderItem = await OrderItemModel.createOrderItems(OrderItemsData);
                return orderItem;
            }
            return [];
        } catch(err) {
            throw err;
        };
    };

    //Load/list user orders by user Id
    async list(userId){
        try {
            const orders = await OrderModel.findByUser(userId);
            return orders;

        }catch(err){
            throw err;
        };
    };

    //Load user orders by orer id
    async findById(orderId){
        try{
            const order = await OrderItemModel.findOrders(orderId);
            return order;

        } catch(err){
            throw err;
        };
    };
};