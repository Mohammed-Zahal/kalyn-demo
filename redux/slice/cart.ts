import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Cart } from "../../types/generated/graphql";

const cartId = Cookies.get("cartId") || null;

const cartSlice = createSlice({
  name: "cartSlice",
  reducers: {
    updateCartId: (state, action) => {
      const newId = action.payload;
      if (newId) {
        Cookies.set("cartId", newId);
      } else {
        Cookies.remove("cartId");
      }
      state.data.cartId = newId;
    },
    updateCart: (state, action) => {
      state.data.cart = action.payload;
    },
  },
  initialState: {
    data: {
      cartId,
      cart: null as Cart | null,
    },
    error: null,
    status: "idle",
  },
});

export default cartSlice.reducer;
export const { updateCart, updateCartId } = cartSlice.actions;
