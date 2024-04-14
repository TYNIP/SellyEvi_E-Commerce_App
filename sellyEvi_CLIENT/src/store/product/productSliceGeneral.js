import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {API_URL} from '../../apis/functions';

/* FUNCTIONS */
export const fetchAllProduct = createAsyncThunk(
  'product/fetchAllProduct',
  async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data;
  }
);

export const fetchLatestProducts = createAsyncThunk(
  'product/fetchLatestProducts',
  async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch latest products');
    }
    const data = await response.json();
    const latestProducts = data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0, 3);
    return latestProducts;
  }
);

export const fetchOldestProducts = createAsyncThunk(
  'product/fetchOldestProducts',
  async () => {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch oldest products');
    }
    const data = await response.json();
    return data;
  }
);

/* SLICE */

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* all products */
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      /* Fetch latest */
      .addCase(fetchLatestProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchLatestProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      /* Fetch oldest */
      .addCase(fetchOldestProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOldestProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchOldestProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export selectors
export const selectProduct = (state) => state.product.product;
export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;

export default productSlice.reducer;
