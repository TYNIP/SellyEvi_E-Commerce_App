import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus } from '../auth/authSlice';
import {createCart, addToCart, checkout, fetchCart, removeFromCart } from '../../apis/cart';

/* FUNCTIONS */
export const createItem = createAsyncThunk(
  'cart/createItem',
  async ({product}) => {
    try {
      console.log('creating to cart yeah ');
      console.log(product);
      console.log('no jala create :c');
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
      console.log('end og cart');
      const item = {
        ...product,
        cartItemId: response.id,
        quantity
      };
      return { item };
    } catch(err) {
      throw err;
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'cart/checkoutCart',
  async ({ cartId, paymentInfo }, thunkAPI) => {
    try {
      const response = await checkout(cartId, paymentInfo);
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
const initialState = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createItem.fulfilled, (state, action) => {

      })
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        /* state.items.push(item); */
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
export default cartSlice.reducer;