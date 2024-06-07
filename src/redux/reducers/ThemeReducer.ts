// features/theme/themeSlice.js
import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: PaletteMode;
}

const initialState: ThemeState = {
  mode: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    resetState: () => initialState,
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
