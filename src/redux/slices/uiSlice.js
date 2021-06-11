import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setUIProperty(state, action) {
      const { name } = action.payload;
      const { value } = action.payload;
      state[name] = value;
    },
    setUIData(state, action) {
      const { name } = action.payload;
      const { value } = action.payload;
      state[name] = { ...state[name], ...value };
    },
  },
});

export const { setUIProperty, setUIData } = uiSlice.actions;
export const getUIProperty = (state, name) => state.ui[name];
export const getUIData = (state, name) => state.ui[name] || {};

export default uiSlice.reducer;
