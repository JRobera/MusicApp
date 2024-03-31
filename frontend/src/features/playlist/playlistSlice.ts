import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type PlaylistItem = {
  _id: string;
  name: string;
  song: string[];
};

type StateType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  playlists: PlaylistItem[];
};

const initialState: StateType = {
  status: "idle",
  error: null,
  playlists: [],
};

const playlistSlice = createSlice({
  name: "userplaylists",
  initialState,
  reducers: {
    createPlaylistRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    createPlaylistSuccess: (state, action) => {
      state.status = "succeeded";
      state.playlists = action.payload.data.playlist;
      // console.log(action.payload.data);
    },
    createPlaylistFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    fetchPlaylistRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    fetchPlaylistSuccess: (state, action) => {
      state.status = "succeeded";
      state.playlists = action.payload.data.playlist;
      // console.log(action.payload.data);
    },
    fetchPlaylistFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    deletePlaylistRequest: (state, _action) => {
      state.status = "pending";
      state.error = null;
    },
    deletePlaylistSuccess: (state, action) => {
      state.status = "succeeded";
      state.playlists = action.payload.data.playlist;
      // console.log(action.payload.data);
    },
    deletePlaylistFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const getuserPlaylists = (state: RootState) =>
  state.userPlaylist.playlists;
export const getPlaylistsStatus = (state: RootState) =>
  state.userPlaylist.status;

export const {
  createPlaylistRequest,
  createPlaylistSuccess,
  createPlaylistFailure,
  fetchPlaylistRequest,
  fetchPlaylistSuccess,
  fetchPlaylistFailure,
  deletePlaylistRequest,
  deletePlaylistSuccess,
  deletePlaylistFailure,
  resetStatus,
} = playlistSlice.actions;
export default playlistSlice.reducer;
