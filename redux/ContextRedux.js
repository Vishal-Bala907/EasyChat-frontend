import { createSlice } from "@reduxjs/toolkit";

const ContextRedux = createSlice({
  name: "userslice",
  initialState: {
    userdeatils: {},
    lightMode: "DARK", // Ensure this is defined
    selectedUser: {},
    requests: [],
    friends: [],
  },
  reducers: {
    setUserDetails: (state, user) => {
      state.userdeatils = user.payload;
    },
    setLightMode: (state) => {
      state.lightMode = state.lightMode === "LIGHT" ? "DARK" : "LIGHT";
    },
    setSelectedUser: (state, user) => {
      console.log("setting selected user ", user.payload);
      state.selectedUser = user.payload;
    },
    setRequest: (state, action) => {
      state.requests = [...action.payload];
    },
    setFriends: (state, friends) => {
      state.friends = [...friends.payload];
    },
  },
});

export const {
  setUserDetails,
  setLightMode,
  setSelectedUser,
  setRequest,
  setFriends,
} = ContextRedux.actions;
export default ContextRedux.reducer;
