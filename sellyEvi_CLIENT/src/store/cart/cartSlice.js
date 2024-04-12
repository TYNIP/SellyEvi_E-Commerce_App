import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { checkLoginStatus } from '../auth/authSlice';
import {createCart, addToCart, checkout, updateCart, removeFromCart } from '../../apis/cart';

/* FUNCTIONS */
export const createItem = createAsyncThunk(
  'cart/createItem',
  async ({product}) => {
    try {
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
      const response = await checkout(cartId, paymentInfo);
      return response;
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
      return;
    } catch(err) {
      throw err;
    }
  }
);

export const updateItem = createAsyncThunk(
  'cart/updateItem',
  async ({cartItemId, qty}, thunkAPI) => {
    try {
      await updateCart(cartItemId, qty);
      return;
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
        const {status} = action.payload;
        state.status = true;
        state.message = status;
      })
      .addCase(removeItem.fulfilled, (state, action) => {

      })
      .addCase(updateItem.fulfilled, (state, action) => {

      })
  }
});

// Export reducer 
export const statusSelector = (state) => state.cart.status;
export const msgSelector = (state) => state.cart.message;
export default cartSlice.reducer;