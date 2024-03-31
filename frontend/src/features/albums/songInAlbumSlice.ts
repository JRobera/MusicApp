import { createSlice } from "@reduxjs/toolkit";

import { playlist } from "../../tyepes";
import { RootState } from "../../app/store";

type songList = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  songs: playlist;
};

const initialState: songList = {
  status: "idle",
  error: null,
  songs: [],
};

const songInAlbumSlice = createSlice({
  name: "songsInAlbum",
  initialState,
  reducers: {
    fetchSongsInAlbumRequest: (state, action) => {
      state.status = "pending";
      state.error = null;
    },
    fetchSongsInAlbumSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload.data;
    },
    fetchSongsInAlbumFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const getAllSongsInAlbum = (state: RootState) =>
  state.songsInAlbum.songs;

export const {
  fetchSongsInAlbumRequest,
  fetchSongsInAlbumSuccess,
  fetchSongsInAlbumFailure,
  resetStatus,
} = songInAlbumSlice.actions;
export default songInAlbumSlice.reducer;
