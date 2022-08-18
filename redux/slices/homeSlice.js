import { createSlice, current } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    activeUserType: "employee",
    loading: false,
  },
  reducers: {
    setActiveUserType: (state, action) => {
      state.activeUserType = action.payload;
      // console.log(current(state.data));
    },
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setActiveUserType, showLoading, hideLoading } =
  homeSlice.actions;
export default homeSlice.reducer;
