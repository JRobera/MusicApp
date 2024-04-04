import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { artist } from "../../tyepes";

type artistType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  artists: artist[];
};

const initialState: artistType = {
  status: "idle",
  error: null,
  artists: [],
};

const artistsSlice = createSlice({
  name: "aritst",
  initialState,
  reducers: {
    fetchArtistRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    fetchArtistSuccess: (state, action) => {
      state.status = "succeeded";
      state.artists = action.payload.data;
    },
    fetchArtistFailuer: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const getAllArtists = (state: RootState) => state.artists.artists;
export const getArtistsStatus = (state: RootState) => state.artists.status;

export const {
  fetchArtistRequest,
  fetchArtistSuccess,
  fetchArtistFailuer,
  resetStatus,
} = artistsSlice.actions;

export default artistsSlice.reducer;
