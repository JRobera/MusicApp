import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { user } from "../../tyepes";

type StateType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  user: user | null;
};

const initialState: StateType = {
  status: "idle",
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    setUserSuccess: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload;
    },
    setUserFailure: (state, action) => {
      state.status = "failed";
      state.user = initialState.user;
      state.error = action.payload.message;
    },
    logOutRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    logOutSuccess: (state, _action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = initialState.user;
    },
    logOutFailure: (state, action) => {
      state.status = "failed";
      state.error = action?.payload?.message;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const currentUser = (state: RootState) => state.user.user;
export const currentUserStatus = (state: RootState) => state.user.status;
export const {
  setUserRequest,
  setUserSuccess,
  setUserFailure,
  logOutRequest,
  logOutSuccess,
  logOutFailure,
  resetStatus,
} = userSlice.actions;
export default userSlice.reducer;
