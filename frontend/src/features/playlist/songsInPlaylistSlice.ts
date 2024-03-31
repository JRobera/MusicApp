import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { song } from "../../tyepes";

type PlaylistItem = {
  _id: string;
  name: string;
  songs: song[];
};

type StateType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  playlist: PlaylistItem;
};

const initialState: StateType = {
  status: "idle",
  error: null,
  playlist: { _id: "", name: "", songs: [] },
};

const songsInPlaylistSlice = createSlice({
  name: "songsInPlaylist",
  initialState,
  reducers: {
    addSongToPlaylistRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    addSongToPlaylistSuccess: (state, action) => {
      state.status = "succeeded";
      state.playlist = action.payload.data;
    },
    addSongToPlaylistFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    fetchSongsInPlaylistRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    fetchSongsInPlaylistSuccess: (state, action) => {
      state.status = "succeeded";
      state.playlist = action.payload.data;
    },
    fetchSongsInPlaylistFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const getAllSongsInPlaylist = (state: RootState) =>
  state.songsInPlaylist.playlist.songs;

export const {
  addSongToPlaylistRequest,
  addSongToPlaylistSuccess,
  addSongToPlaylistFailure,
  fetchSongsInPlaylistRequest,
  fetchSongsInPlaylistSuccess,
  fetchSongsInPlaylistFailure,
  resetStatus,
} = songsInPlaylistSlice.actions;

export default songsInPlaylistSlice.reducer;
