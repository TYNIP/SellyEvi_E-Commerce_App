import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isLoggedIn, login, register } from '../../apis/auth';

/* FUNCTIONS */
export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn();

      return {
        cart: response.cart,
        isAuthenticated: true,
        user: response.user
      }
    } catch(err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      return {
        user: response,
        isAuthenticated: true
      }
    } catch(err) {
      throw err;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      await register(credentials);
      return {};
    } catch(err) {
      throw err;
    }
  }
);

/* SLICE */
const initialState = {
    isFetching: false,
    isAuthenticated: false,
    error: null
  }
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(checkLoginStatus.fulfilled, (state, action) => {
          const { isAuthenticated } = action.payload;
          state.isAuthenticated = isAuthenticated;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          const { isAuthenticated } = action.payload;
          state.isAuthenticated = isAuthenticated;
        })
        .addCase(loginUser.rejected, (state, action) => {
          const { error } = action.payload;
          state.isAuthenticated = false;
          state.error = error;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
        })
        .addCase(registerUser.rejected, (state, action) => {
          const { error } = action.payload;
          state.isAuthenticated = false;
          state.error = error;
        })
    }
  });
  
  // Export reducer
  export const selectError = (state) => state.auth.error;
  export default authSlice.reducer;