const OrderModel = require('../models/orders');
const OrderItemModel = require('../models/order_items');
const OrderItemModelInstance = new OrderItemModel;

/* SERVICE - ORDER */

module.exports = class OrderService{

    //Create new order and save it
    async create(data){
        const {userId} = data;
        try{
            const Order = new OrderModel();
            const order = await Order.create({userId, total});
            return cart;

        } catch(err){
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