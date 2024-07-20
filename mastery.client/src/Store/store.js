import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import registerReducer from '../slices/registerSlice';
import {thunk} from 'redux-thunk';
import  otpReducer from '../slices/otpVerificationSlice';
import resentReducer from '../slices/resentOtpSlice';
import passwordReducer from '../slices/passwordSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    otp : otpReducer,
    resent : resentReducer,
    password : passwordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;
