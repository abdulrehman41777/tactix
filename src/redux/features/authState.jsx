import { createSlice } from "@reduxjs/toolkit";

export const authState = createSlice({
  name: "userAuth",
  initialState: {
    isLoggin: false,
    data: null,
  },
  reducers: {
    authUser: (state, action) => {
      state.isLoggin = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.isLoggin = false;
      state.data = null;
    },
  },
});

export const { logout, authUser } = authState.actions;
export default authState.reducer;
