import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {API_URL} from '../../apis/functions';

/* FUNCTIONS */
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data;
  }
);
export const fetchProductSearch = createAsyncThunk(
  'product/fetchProductSearch',
  async (searchTerm) => {
    const response = await fetch(`${API_URL}/products/search/${searchTerm}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data;
  }
);

/* SLICE */
const productIdSlice = createSlice({
  name: 'productId',
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    /* By id */
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      /* By search*/
      .addCase(fetchProductSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export selectors
export const selectProductId = (state) => state.productId.product;
export const selectLoadingId = (state) => state.productId.loading;
export const selectErrorId = (state) => state.productId.error;

export default productIdSlice.reducer;
