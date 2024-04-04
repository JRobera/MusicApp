import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type category = {
  songCount: number;
  albumCount: number;
  artistCount: number;
  genreCount: number;
};
type catType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  data: category[];
};

const initialState: catType = {
  status: "idle",
  error: null,
  data: [],
};

const categoryCountSlice = createSlice({
  name: "categorycount",
  initialState,
  reducers: {
    fetchCatCountRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    fetchCatCountSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    },
    fetchCatCountFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const getAllCatCount = (state: RootState) => state.catCount.data;
export const getCatStatus = (state: RootState) => state.catCount.status;
export const getCatError = (state: RootState) => state.catCount.error;

export const {
  fetchCatCountRequest,
  fetchCatCountSuccess,
  fetchCatCountFailure,
} = categoryCountSlice.actions;

export default categoryCountSlice.reducer;
