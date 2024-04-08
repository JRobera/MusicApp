import { createSlice } from "@reduxjs/toolkit";
import { playlist, song } from "../../tyepes";
import { RootState } from "../../app/store";

type currentPlaylist = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  playlist: playlist;
  currentTrackIndex: number;
  currentTrackId: string;
  isPlaying: boolean;
};

const initialState: currentPlaylist = {
  status: "idle",
  error: null,
  playlist: JSON.parse(localStorage.getItem("currentPlaylist") || "[]"),
  currentTrackIndex: Number(localStorage.getItem("currentTrackIndex")) || 0,
  currentTrackId: localStorage.getItem("currentTrackId") || "",
  isPlaying: false,
};

const currentPlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action) => {
      state.playlist = action.payload.data;
      localStorage.setItem(
        "currentPlaylist",
        JSON.stringify(action.payload.data)
      );
      state.currentTrackIndex = action.payload.data.findIndex((song: song) => {
        let trackID = action.payload.trackId || state.currentTrackId;
        if (song._id === trackID) {
          return song._id;
        }
      });
      localStorage.setItem(
        "currentTrackIndex",
        String(state.currentTrackIndex)
      );
      localStorage.setItem(
        "currentTrackId",
        String(
          action.payload.trackId ? action.payload.trackId : state.currentTrackId
        )
      );
      state.currentTrackId = String(
        action.payload.trackId ? action.payload.trackId : state.currentTrackId
      );
      state.status = "succeeded";
      state.error = null;
    },
    increaseCurrentTrackIndex: (state) => {
      if (state.currentTrackIndex < state.playlist.length - 1) {
        state.currentTrackIndex += 1;
      } else {
        state.currentTrackIndex = 0;
      }
      localStorage.setItem(
        "currentTrackIndex",
        String(state.currentTrackIndex)
      );
    },
    decreaseCurrentTrackIndex: (state) => {
      if (state.currentTrackIndex === 0) {
        state.currentTrackIndex = state.playlist.length - 1;
      } else {
        state.currentTrackIndex -= 1;
      }
      localStorage.setItem(
        "currentTrackIndex",
        String(state.currentTrackIndex)
      );
    },
    onTrackEnd: (state) => {
      if (state.currentTrackIndex < state.playlist.length - 1) {
        state.currentTrackIndex += 1;
      } else {
        state.currentTrackIndex = 0;
      }
      localStorage.setItem(
        "currentTrackIndex",
        String(state.currentTrackIndex)
      );
    },
    fetchCurrentPlaylistRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    fetchCurrentPlaylistSuccess: (state, action) => {
      state.status = "succeeded";
      state.playlist = action.payload;
    },
    fetchCurrentPlaylistFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    setCurrentTrackId: (state, action) => {
      localStorage.setItem("currentTrackId", String(action.payload));
      state.currentTrackId = String(action.payload);
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const getAllPlaylistItems = (state: RootState) =>
  state.currentPlaylist.playlist;
export const currentTrackIndex = (state: RootState) =>
  state.currentPlaylist.currentTrackIndex;
export const getcurrentTrackId = (state: RootState) =>
  state.currentPlaylist.currentTrackId;
export const getIsPlaying = (state: RootState) =>
  state.currentPlaylist.isPlaying;

export const {
  setCurrentPlaylist,
  increaseCurrentTrackIndex,
  decreaseCurrentTrackIndex,
  onTrackEnd,
  fetchCurrentPlaylistRequest,
  fetchCurrentPlaylistSuccess,
  fetchCurrentPlaylistFailure,
  setIsPlaying,
  setCurrentTrackId,
} = currentPlaylistSlice.actions;

export default currentPlaylistSlice.reducer;
