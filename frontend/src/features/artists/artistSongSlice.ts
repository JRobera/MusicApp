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

const artistSongSlice = createSlice({
  name: "artistsSongs",
  initialState,
  reducers: {
    fetchArtistSongsRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    fetchArtistSongsSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload.data;
    },
    fetchArtistSongsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const getArtistSongs = (state: RootState) => state.artistSongs.songs;

export const {
  fetchArtistSongsRequest,
  fetchArtistSongsSuccess,
  fetchArtistSongsFailure,
  resetStatus,
} = artistSongSlice.actions;

export default artistSongSlice.reducer;
