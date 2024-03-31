import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type album = { artist: string; albumTitle: string; songCount: number };

type albumType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  albums: album[];
};

const initialState: albumType = {
  status: "idle",
  error: null,
  albums: [],
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    fetchAlbumRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    fetchAlbumSuccess: (state, action) => {
      state.status = "succeeded";
      state.albums = action.payload.data;
    },
    fetchAlbumFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const getAllAlbums = (state: RootState) => state.albums.albums;
export const getAlbumsStatus = (state: RootState) => state.albums.status;
export const getAlbumsError = (state: RootState) => state.albums.error;

export const {
  fetchAlbumRequest,
  fetchAlbumSuccess,
  fetchAlbumFailure,
  resetStatus,
} = albumSlice.actions;
export default albumSlice.reducer;
