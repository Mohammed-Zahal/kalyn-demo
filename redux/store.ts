import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./slice/auth";
import cartreducer from "./slice/cart";

export const store = configureStore({
  reducer: {
    auth: authreducer,
    cart: cartreducer,
  },
});
