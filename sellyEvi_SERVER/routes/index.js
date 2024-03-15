const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const productRouter = require('./product');
const userRouter = require('./user');

/* Connected/used in loaders including props*/

module.exports= (data, passport){
    authRouter(data, passport);
    cartRouter(data);
    orderRouter(data);
    productRouter(data);
    userRouter(data);
};