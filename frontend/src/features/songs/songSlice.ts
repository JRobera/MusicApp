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

const songSlice = createSlice({
  name: "song",
  initialState: initialState,
  reducers: {
    // C
    addSongRequest: (state, action) => {
      state.status = "pending";
      state.error = null;
    },
    addSongSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = [action.payload.data, ...state.songs];
      // console.log(action.payload);
    },
    addSongFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    // R
    fetchSongRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    fetchSongSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload.data;
    },
    fetchSongFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    // U
    updateSongRequest: (state, action) => {
      state.status = "pending";
      state.error = null;
    },
    updateSongSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload.data;
    },
    updateSongFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    // D
    deleteSongRequest: (state, action) => {
      state.status = "pending";
      state.error = null;
    },
    deleteSongSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload.data;
    },
    deleteSongFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const selectAllSongs = (state: RootState) => state.songs.songs;
export const getSongStatus = (state: RootState) => state.songs.status;
export const getSongerror = (state: RootState) => state.songs.error;

// Action Creators
export const {
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  fetchSongRequest,
  fetchSongSuccess,
  fetchSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  resetStatus,
} = songSlice.actions;

export default songSlice.reducer;
