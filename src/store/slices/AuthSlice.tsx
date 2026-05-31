import { createSlice } from "@reduxjs/toolkit";

export type Auth = {
  isLoggedin: boolean;
};

export type AuthState = {
  auth: Auth;
};

const initialState: AuthState = {
  auth: {
    isLoggedin: false,
  },
};

export const AuthSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess:(state)=>{
            state.auth.isLoggedin=true
        },
        logOut:(state)=>{
            state.auth.isLoggedin=false
        }
    }
})

export const { logOut,loginSuccess} = AuthSlice.actions
export default AuthSlice.reducer