import { combineReducers } from 'redux';
import productReducer from './product/productSliceGeneral';
import productIdReducer from './product/productSliceSpecific';
import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice';
import orderReducer from './orders/ordersSlice';
import userReducer from './user/userSlice';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
    productId: productIdReducer,
  cart: cartReducer,
  order: orderReducer
});
  