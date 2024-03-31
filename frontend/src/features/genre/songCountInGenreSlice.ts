import { createSlice } from "@reduxjs/toolkit";

type songCountInGenreType = { genreCount: number; genre: string };

type songCountInGenre = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  data: songCountInGenreType[];
};

const initialState: songCountInGenre = {
  status: "idle",
  error: null,
  data: [],
};

const songCountInGenreSlice = createSlice({
  name: "songCountInGenre",
  initialState,
  reducers: {
    fetchSongCountInGenreRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    fetchSongCountInGenreSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    },
    fetchSongCountInGenreFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongCountInGenreRequest,
  fetchSongCountInGenreSuccess,
  fetchSongCountInGenreFailure,
} = songCountInGenreSlice.actions;

export default songCountInGenreSlice.reducer;
