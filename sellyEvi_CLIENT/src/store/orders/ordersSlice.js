import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkoutCart } from '../cart/cartSlice';
import { fetchOrder, fetchOrders } from '../../apis/order';

/* FUNCTIONS */
export const loadOrder = createAsyncThunk(
  'orders/loadOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await fetchOrder(orderId);
      return {
        order: response
      };
    } catch(err) {
      throw err;
    }
  }
);

export const loadOrders = createAsyncThunk(
  'orders/loadOrders',
  async (params, thunkAPI) => {
    try {
      const response = await fetchOrders();
      return {
        orders: response
      }
    } catch(err) {
      throw err;
    }
  }
);

/* SLICE */
const initialState = {}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Add order from successful checkout
      .addCase(checkoutCart.fulfilled, (state, action) => {
        const { order } = action.payload;
        state[order.id] = order;
      })
      // Load order data by ID success
      .addCase(loadOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state[order.id] = order;
      })
      // Load order list success
      .addCase(loadOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        orders.forEach(order => {
          const { id } = order;
          state[id] = order;
        });
      })
  }
});

// Export reducer function
export default orderSlice.reducer;