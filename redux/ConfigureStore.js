import { configureStore } from "@reduxjs/toolkit";
import ContextRedux from "./ContextRedux";

export default configureStore({
  reducer: {
    userReducer: ContextRedux,
  },
});
