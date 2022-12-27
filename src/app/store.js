import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// THE GLOBAL STORE SET
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
