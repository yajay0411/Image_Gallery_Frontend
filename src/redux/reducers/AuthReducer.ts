import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const baseSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    isLogin: (state) => {
      state.isAuthenticated = true;
    },
    isLogout: (state) => {
      state.isAuthenticated = false;
    },
    resetState: () => initialState,
  },
});

export const { isLogin, isLogout } = baseSlice.actions;

export default baseSlice.reducer;
