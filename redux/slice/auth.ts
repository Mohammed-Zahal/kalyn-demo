import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../types/generated/graphql";

const token = typeof window !== "undefined" ? localStorage.getItem("token") || null : null;
const authSlice = createSlice({
  name: "authSlice",
  reducers: {
    updateUser: (state, action) => {
      state.data.user = action.payload;
    },
    updateToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
      state.data.token = action.payload;
    },
  },
  initialState: {
    data: {
      user: null as  Customer | null,
      token,
    },
    error: null,
    status: "idle",
  },
});
export default authSlice.reducer;
export const { updateToken, updateUser } = authSlice.actions;
