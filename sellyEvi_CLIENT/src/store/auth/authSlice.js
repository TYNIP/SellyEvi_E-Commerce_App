import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isLoggedIn, login, register, logout, loginWithFacebook, loginWithGoogle } from '../../apis/auth';

/* FUNCTIONS */
export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async () => {
    try {
      const response = await isLoggedIn();
      return {
        cart: response.cart,
        isAuthenticated: true,
        user: response
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
      console.log('login in process')
      const response = await login(credentials);
      console.log('response from login', response);
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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    try {
      console.log('running for out')
      await logout();
      return {
        isAuthenticated: false
      };
    } catch(err) {
      throw err;
    }
  }
);

//third parties
export const loginWithGoogleUser = createAsyncThunk(
  'auth/loginWithGoogleUser',
  async () => {
    try {
      const response = await loginWithGoogle();
      return {
        user: response,
        isAuthenticated: true
      }
    } catch(err) {
      throw err;
    }
  }
);

/* SLICE */
const initialState = {
    isFetching: false,
    isAuthenticated: false,
    error: null,
    userinfo: null,
  }
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(checkLoginStatus.fulfilled, (state, action) => {
          const { isAuthenticated } = action.payload;
          console.log('this is the new era check log in');
          console.log(action.payload);
          state.isAuthenticated = isAuthenticated;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          const {isAuthenticated, user} = action.payload;
          state.isAuthenticated = isAuthenticated;
          console.log('this is the new era log in');
          console.log(user);
          state.userinfo = user;
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
        .addCase(logoutUser.fulfilled, (state, action) => {
          state.isAuthenticated = false;
          state.userinfo = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.isAuthenticated = false;
          state.userinfo = null;
          state.error = action.error.message;
        })
        .addCase(loginWithGoogleUser.fulfilled, (state, action) => {
          const { isAuthenticated, user } = action.payload;
          state.isAuthenticated = isAuthenticated;
          state.userinfo = user;
        })
        .addCase(loginWithGoogleUser.rejected, (state, action) => {
          const { error } = action.payload;
          state.isAuthenticated = false;
          state.error = error;
        })
    }
  });
  
  // Export reducer
  export const authSelector = (state) => state.auth.isAuthenticated;
  export const userSelector = (state) => state.auth.userinfo;
  export const selectError = (state) => state.auth.error;
  export default authSlice.reducer;