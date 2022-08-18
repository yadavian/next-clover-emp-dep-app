import { createSlice, current } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userType: "",
    data: [],
    isLoggedIn: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      // console.log(current(state.data));
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setisLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setloginData, setData, setUserType, setisLoggedIn } =
  loginSlice.actions;
export default loginSlice.reducer;
