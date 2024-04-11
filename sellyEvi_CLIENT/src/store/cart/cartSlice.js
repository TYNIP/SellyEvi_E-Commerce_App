import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { checkLoginStatus } from '../auth/authSlice';
import {createCart, addToCart, checkout, fetchCart, removeFromCart } from '../../apis/cart';

/* FUNCTIONS */
export const createItem = createAsyncThunk(
  'cart/createItem',
  async ({product}) => {
    try {
      console.log(product);
      await createCart(product.id);
      return;
    } catch(err) {
      throw err;
    }
  }
);

export const addItem = createAsyncThunk(
  'cart/addItem',
  async ({product, quantity}) => {
    try {
      const response = await addToCart(product.id,product.price, quantity);
      return response;
    } catch(err) {
      throw err;
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'cart/checkoutCart',
  async ({ cartId, paymentInfo }, thunkAPI) => {
    try {
      console.log('cartId', paymentInfo)
      console.log('paymentInfo', paymentInfo)
      const response = await checkout(cartId, paymentInfo);
      console.log('the payment response', response);
      return {
        order: response
      }
    } catch(err) {
      throw err;
    }
  }
);

export const loadCart = createAsyncThunk(
  'cart/loadCart',
  async (params, thunkAPI) => {
    try {
      const response = await fetchCart();
      return {
        cart: response
      }
    } catch(err) {
      throw err;
    }
  }
);

export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (cartItemId, thunkAPI) => {
    try {
      await removeFromCart(cartItemId);
      return {
        item: cartItemId
      }
    } catch(err) {
      throw err;
    }
  }
);


/* SLICE */
const initialState = {
  status: false,
  message: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createItem.fulfilled, (state, action) => {

      })
      .addCase(addItem.fulfilled, (state, action) => {
        const {status} = action.payload;
        state.status = true;
        state.message = status;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items = state.items.filter((product) => product.cartItemId !== item);
      })
  }
});

// Export reducer 
export const statusSelector = (state) => state.cart.status;
export const msgSelector = (state) => state.cart.message;
export default cartSlice.reducer;