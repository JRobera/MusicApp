import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { user } from "../../tyepes";
import { jwtDecode } from "jwt-decode";

type StateType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  user: user | null;
  accessToken: string | "";
};

const initialState: StateType = {
  status: "idle",
  error: null,
  user: null,
  accessToken: "",
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
      state.user = jwtDecode(action.payload.data);
      state.accessToken = action.payload.data;
    },
    setUserFailure: (state, action) => {
      state.status = "failed";
      state.user = initialState.user;
      state.error = action.payload.response.data.message;
    },
    signUpRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = jwtDecode(action.payload.data);
      state.accessToken = action.payload.data;
    },
    signUpFailure: (state, action) => {
      state.status = "failed";
      state.user = initialState.user;
      state.error = action.payload.response.data.message;
    },
    logInRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    logInSuccess: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = jwtDecode(action.payload.data);
    },
    logInFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.response.data.message;
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
      state.error = null;
    },
  },
});

export const currentUser = (state: RootState) => state.user.user;
export const getaccessToken = (state: RootState) => state.user.accessToken;
export const currentUserStatus = (state: RootState) => state.user.status;
export const currentUserError = (state: RootState) => state.user.error;
export const {
  setUserRequest,
  setUserSuccess,
  setUserFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  logInRequest,
  logInSuccess,
  logInFailure,
  logOutRequest,
  logOutSuccess,
  logOutFailure,
  resetStatus,
} = userSlice.actions;
export default userSlice.reducer;
