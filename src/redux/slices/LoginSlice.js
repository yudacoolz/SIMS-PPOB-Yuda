// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: sessionStorage.getItem("token") ? true : false,
  isToken: sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : null,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // setIsLogin: (state, action) => {
    //   state.isLogin = action.payload;
    // },
    setIsLogin: (state) => {
      state.isLogin = true;
    },
    setIsToken: (state, action) => {
      state.isToken = action.payload;
    },
    LogOut: (state) => {
      state.isLogin = false;
      state.isToken = null;
      sessionStorage.removeItem("token");
    },
  },
});

export const { setIsLogin, setIsToken, LogOut } = LoginSlice.actions;

export default LoginSlice.reducer;
