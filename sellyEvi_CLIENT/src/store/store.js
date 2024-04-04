import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/productSliceGeneral';
import productIdReducer from './product/productSliceSpecific';

export const store = configureStore({
  reducer: {
    product: productReducer,
    productId: productIdReducer,
  },
});
  