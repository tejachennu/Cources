import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  otpSent: false,
  loading: false,
  error: null,
  Sucess : false,
}
// Async thunk for sending OTP
export const sendOtp = createAsyncThunk('password/sendOtp', async (email) => {
  const response = await axios.post('https://localhost:7253/api/User/sendotp', { email });
  return response.data;
});

// Async thunk for resetting password
export const resetPassword = createAsyncThunk('password/resetPassword', async (data) => {
  const response = await axios.post('https://localhost:7253/api/User/ForgotPassword', data);
  return response.data;
});

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        state.Sucess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { reset } = passwordSlice.actions;

export default passwordSlice.reducer;
