import { createSlice } from "@reduxjs/toolkit";

interface BaseState {
  backdrop: boolean;
  menu: boolean;
}

const initialState: BaseState = {
  backdrop: false,
  menu: false,
};

const baseSlice = createSlice({
  name: "baseSlice",
  initialState,
  reducers: {
    showBackdrop: (state) => {
      state.backdrop = true;
    },
    hideBackdrop: (state) => {
      state.backdrop = false;
    },
    showMenu: (state) => {
      state.menu = true;
    },
    hideMenu: (state) => {
      state.menu = false;
    },
    resetState: () => initialState,
  },
});

export const { showBackdrop, hideBackdrop, showMenu, hideMenu } =
  baseSlice.actions;

export default baseSlice.reducer;
