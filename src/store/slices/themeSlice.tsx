import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeTypes = "dark" | "light" | "system";

export type ThemeState = {
  theme: ThemeTypes;
};

const initialState: ThemeState = {
  theme: "system",
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<{ theme: ThemeTypes }>) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;