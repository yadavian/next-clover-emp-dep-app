import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import homeReducer from "./slices/homeSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
  },
});
