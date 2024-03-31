import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { playlist } from "../../tyepes";

type sogeList = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  songs: playlist;
};

const initialState: sogeList = {
  status: "idle",
  error: null,
  songs: [],
};

const songsInGenreSlice = createSlice({
  name: "songsInGenre",
  initialState,
  reducers: {
    fetchSongsInGenreRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    fetchSongsInGenreSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload.data;
    },
    fetchSongsInGenreFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const getAllSongsInGenre = (state: RootState) =>
  state.songsInGenre.songs;

export const {
  fetchSongsInGenreRequest,
  fetchSongsInGenreSuccess,
  fetchSongsInGenreFailure,
} = songsInGenreSlice.actions;

export default songsInGenreSlice.reducer;
