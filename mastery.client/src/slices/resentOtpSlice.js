import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for registering a user
export const otpResentMail = createAsyncThunk(
  'resent/otpResentMail',
  async ({ email}, thunkAPI) => {
    try {
      const response = await axios.post('https://localhost:7253/api/user/ResendOtp', {
        email
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const resentOtpSlice = createSlice({
  name: 'resent',
  initialState: {
     isSent : false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(otpResentMail.pending, (state) => {
          state.isSent = false;
      })
      .addCase(otpResentMail.fulfilled, (state, action) => {
        state.isSent = true;
      })
      .addCase(otpResentMail.rejected, (state, action) => {
        state.isSent = false;
      });
  },
});

export default resentOtpSlice.reducer;
