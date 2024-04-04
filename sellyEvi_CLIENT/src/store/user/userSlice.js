import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser } from '../auth/authSlice';

const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
      // Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
  }
});

// Export reducer function
export default userSlice.reducer;