import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (searchTerm) => {
    const response = await fetch(`https://sellyEviApi.artmoram.com/products?search=${searchTerm}`);
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
    const response = await fetch('https://sellyEviApi.artmoram.com/latest-products');
    if (!response.ok) {
      throw new Error('Failed to fetch latest products');
    }
    const data = await response.json();
    return data;
  }
);

export const fetchOldestProducts = createAsyncThunk(
  'product/fetchOldestProducts',
  async () => {
    const response = await fetch('https://sellyEviApi.artmoram.com/oldest-products');
    if (!response.ok) {
      throw new Error('Failed to fetch oldest products');
    }
    const data = await response.json();
    return data;
  }
);

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
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
