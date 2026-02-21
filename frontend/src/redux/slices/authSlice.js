import { createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth");

const initialState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      user: null,
      token: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;