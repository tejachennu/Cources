import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const otpVerification = createAsyncThunk(
    'otp/otpVerification', 
    async(userVerification , thunkAPI)=>{
        try{
                const response = await axios.post('https://localhost:7253/api/User/VerifyEmail', {
                email: userVerification.email,
                verificationCode: userVerification.code
                });
            var data =  response.data;
            return data
          
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const otpVerificationSlice = createSlice({

    name:'otp',
    initialState:{
        loading: false,
        error: null,
        isAuthenticated:false,
        content:"",
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(otpVerification.fulfilled,(state,action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.content = action.payload;
        })
        builder.addCase(otpVerification.pending,(state,action)=>{
            state.loading = true;
            state.error = false;
        })
        builder.addCase(otpVerification.rejected,(state,action)=>{
            state.error = action.payload;
            state.isAuthenticated = false;
        })
    }

},);

export default otpVerificationSlice.reducer