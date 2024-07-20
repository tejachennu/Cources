import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState= {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

// Thunk for registering a user
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async ({ mobileNumber, name, email, password }, thunkAPI) => {
    try {
      const response = await axios.post('https://localhost:7253/api/user/register', {
        mobileNumber,
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    reset: () => initialState
},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = registerSlice.actions;

export default registerSlice.reducer;
